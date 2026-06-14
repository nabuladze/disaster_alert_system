# FastAPI-ს ძირითადი კომპონენტები
from fastapi import FastAPI, Depends, Security

# HTTP Bearer გამოიყენება JWT token-ის მისაღებად protected endpoint-ებში
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# SQLAlchemy Session გამოიყენება მონაცემთა ბაზასთან სამუშაოდ
from sqlalchemy.orm import Session

# JWT token-ის შექმნა და გადამოწმება
from app.jwt_handler import create_access_token, verify_token

# პაროლის შემოწმება და hash ფუნქცია
from app.auth import verify_password, hash_password

# OpenWeather API-დან ამინდის მონაცემების მიღება
from app.weather import get_weather

# CORS middleware frontend-ს აძლევს backend-თან დაკავშირების უფლებას
from fastapi.middleware.cors import CORSMiddleware

# მონაცემთა ბაზის კავშირი და მოდელები
from app.database import engine, get_db
from app.models import Base, User, Alert

# Pydantic schemas request body validation-ისთვის
from app.schemas import UserCreate, UserLogin, LocationUpdate


# FastAPI აპლიკაციის შექმნა
app = FastAPI()


# CORS კონფიგურაცია
# საჭიროა, რომ React frontend-მა შეძლოს FastAPI backend-თან request-ების გაგზავნა
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# HTTP Bearer security scheme JWT token-ისთვის
security = HTTPBearer()


# აპლიკაციის გაშვებისას ცხრილების ავტომატურად შექმნა,
# თუ ისინი მონაცემთა ბაზაში ჯერ არ არსებობს
Base.metadata.create_all(bind=engine)


# მთავარი endpoint, რომელიც ამოწმებს backend-ის მუშაობას
@app.get("/")
def root():
    return {"message": "Backend running"}


# მომხმარებლის რეგისტრაცია
@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    # პაროლის დაშიფვრა ბაზაში შენახვამდე
    hashed_pw = hash_password(user.password)

    # ვამოწმებთ, ხომ არ არსებობს იგივე ტელეფონის ნომრით მომხმარებელი
    existing_user = (
        db.query(User)
        .filter(User.phone == user.phone)
        .first()
    )

    if existing_user:
        return {"error": "Phone number already registered"}

    # მომხმარებელი ვალდებულია დაეთანხმოს წესებს და პირობებს
    if not user.accepted_terms:
        return {"error": "You must accept terms and conditions"}

    # ახალი User ობიექტის შექმნა
    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        date_of_birth=user.date_of_birth,
        phone=user.phone,
        password=hashed_pw,
        region=user.region,
        city=user.city,
        accepted_terms=user.accepted_terms
    )

    # მომხმარებლის შენახვა მონაცემთა ბაზაში
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user_id": new_user.id
    }


# მომხმარებლის ავტორიზაცია
@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    # მომხმარებლის მოძებნა ტელეფონის ნომრით
    db_user = db.query(User).filter(User.phone == user.phone).first()

    if not db_user:
        return {"error": "User not found"}

    # შეყვანილი პაროლის შედარება ბაზაში შენახულ დაშიფრულ პაროლთან
    if not verify_password(user.password, db_user.password):
        return {"error": "Incorrect password"}

    # წარმატებული ავტორიზაციის შემდეგ JWT token-ის შექმნა
    token = create_access_token({"user_id": db_user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# ქალაქის მიხედვით ამინდის და რისკის ინფორმაციის მიღება
@app.get("/weather/{city}")
def weather(city: str):
    return get_weather(city)


# მომხმარებლის ქალაქისთვის alert-ის გენერაცია
# endpoint დაცულია JWT token-ით
@app.post("/generate-alert-for-city/{city}")
def generate_alert_for_city(
    city: str,
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: Session = Depends(get_db)
):

    # request-იდან JWT token-ის მიღება
    token = credentials.credentials

    # token-ის გადამოწმება
    payload = verify_token(token)

    if not payload:
        return {"error": "Invalid or expired token"}

    # token-იდან user_id-ის ამოღება
    user_id = payload.get("user_id")

    # მიმდინარე მომხმარებლის პოვნა ბაზაში
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return {"error": "User not found"}

    # მომხმარებელს შეუძლია alert-ის გენერაცია მხოლოდ საკუთარი ქალაქისთვის
    if user.city != city:
        return {"error": "You can only generate alerts for your own city"}

    # ამინდის მონაცემების მიღება OpenWeather API-დან
    weather_data = get_weather(city)

    if "error" in weather_data:
        return weather_data

    # თუ საფრთხე არ არის, alert ბაზაში არ ინახება
    if weather_data["disaster_type"] == "No danger":
        return {"message": "No danger detected"}

    # ახალი alert-ის შექმნა კონკრეტული მომხმარებლისთვის
    new_alert = Alert(
        user_id=user.id,
        city=city,
        risk_level=weather_data["risk_level"],
        disaster_type=weather_data["disaster_type"],
        recommendation=weather_data["recommendation"]
    )

    # alert-ის შენახვა მონაცემთა ბაზაში
    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)

    return {
        "message": "Alert generated for current user",
        "city": city,
        "user_id": user.id,
        "alert_id": new_alert.id,
        "weather": weather_data
    }


# მიმდინარე მომხმარებლის შეტყობინებების მიღება
# აბრუნებს მხოლოდ იმ alert-ებს, რომლებიც კონკრეტულ user_id-ს ეკუთვნის
@app.get("/my-alerts")
def get_my_alerts(
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials
    payload = verify_token(token)

    if not payload:
        return {"error": "Invalid or expired token"}

    user_id = payload.get("user_id")

    alerts = (
        db.query(Alert)
        .filter(Alert.user_id == user_id)
        .filter(Alert.disaster_type != "No danger")
        .order_by(Alert.created_at.desc())
        .all()
    )

    return alerts


# ყველა alert-ის მიღება
# ძირითადად გამოიყენება ტესტირების ან ადმინისტრაციული მიზნებისთვის
@app.get("/alerts")
def get_alerts(db: Session = Depends(get_db)):
    alerts = (
        db.query(Alert)
        .order_by(Alert.created_at.desc())
        .all()
    )

    return alerts


# კონკრეტული ქალაქის alert-ების მიღება
@app.get("/alerts/{city}")
def get_alerts_by_city(city: str, db: Session = Depends(get_db)):
    alerts = (
        db.query(Alert)
        .filter(Alert.city == city)
        .order_by(Alert.created_at.desc())
        .all()
    )

    return alerts


# კონკრეტული ქალაქის მხოლოდ საფრთხის შემცველი alert-ების მიღება
@app.get("/danger-alerts/{city}")
def get_danger_alerts_by_city(city: str, db: Session = Depends(get_db)):
    alerts = (
        db.query(Alert)
        .filter(Alert.city == city)
        .filter(Alert.disaster_type != "No danger")
        .order_by(Alert.created_at.desc())
        .all()
    )

    return alerts


# ყველა აქტიური საფრთხის მიღება
@app.get("/active-alerts")
def get_active_alerts(db: Session = Depends(get_db)):
    alerts = (
        db.query(Alert)
        .filter(Alert.disaster_type != "No danger")
        .order_by(Alert.created_at.desc())
        .all()
    )

    return alerts


# alert-ის წაშლა ID-ის მიხედვით
@app.delete("/delete-alert/{alert_id}")
def delete_alert(alert_id: int, db: Session = Depends(get_db)):

    alert = db.query(Alert).filter(Alert.id == alert_id).first()

    if not alert:
        return {"error": "Alert not found"}

    db.delete(alert)
    db.commit()

    return {
        "message": "Alert deleted successfully"
    }


# ყველა მომხმარებლის მიღება
# გამოიყენება ტესტირების დროს
@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users


# მომხმარებლების მიღება რეგიონის მიხედვით
@app.get("/users/{region}")
def get_users_by_region(region: str, db: Session = Depends(get_db)):
    users = db.query(User).filter(User.region == region).all()
    return users


# protected endpoint JWT token-ის შესამოწმებლად
@app.get("/protected")
def protected_route(
    credentials: HTTPAuthorizationCredentials = Security(security)
):

    token = credentials.credentials
    payload = verify_token(token)

    if not payload:
        return {"error": "Invalid or expired token"}

    return {
        "message": "Protected route accessed successfully",
        "user_data": payload
    }


# მიმდინარე ავტორიზებული მომხმარებლის ინფორმაციის მიღება
@app.get("/me")
def get_me(
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials
    payload = verify_token(token)

    if not payload:
        return {"error": "Invalid or expired token"}

    user_id = payload.get("user_id")

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return {"error": "User not found"}

    return {
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "phone": user.phone,
        "date_of_birth": user.date_of_birth,
        "region": user.region,
        "city": user.city
    }


# მიმდინარე მომხმარებლის მდებარეობის განახლება
@app.put("/me/location")
def update_my_location(
    location: LocationUpdate,
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials
    payload = verify_token(token)

    if not payload:
        return {"error": "Invalid or expired token"}

    user_id = payload.get("user_id")

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return {"error": "User not found"}

    # მომხმარებლის ახალი region და city მნიშვნელობების შენახვა
    user.region = location.region
    user.city = location.city

    db.commit()
    db.refresh(user)

    return {
        "message": "Location updated successfully",
        "user_id": user.id,
        "region": user.region,
        "city": user.city
    }