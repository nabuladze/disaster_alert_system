from fastapi import FastAPI, Depends, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.jwt_handler import create_access_token, verify_token
from app.auth import verify_password
from app.weather import get_weather
from app.risk_engine import analyze_risk

# ჩვენი ფაილები
from app.database import engine, get_db
from app.models import Base, User, Alert
from app.schemas import UserCreate, UserLogin
from app.auth import hash_password

# FastAPI აპლიკაციის შექმნა
app = FastAPI()
security = HTTPBearer()

# ცხრილების ავტომატური შექმნა DB-ში
Base.metadata.create_all(bind=engine)


# მთავარი ტესტი endpoint
@app.get("/")
def root():
    return {"message": "Backend running"}


# რეგისტრაციის API
@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    hashed_pw = hash_password(user.password)

    existing_user = (
        db.query(User)
        .filter(User.phone == user.phone)
        .first()
    )

    if existing_user:
        return {"error": "Phone number already registered"}

    new_user = User(
        phone=user.phone,
        password=hashed_pw,
        region=user.region
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user_id": new_user.id
    }


# login API
@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.phone == user.phone).first()

    if not db_user:
        return {"error": "User not found"}

    if not verify_password(user.password, db_user.password):
        return {"error": "Incorrect password"}

    token = create_access_token({"user_id": db_user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# real weather + risk API
@app.get("/weather/{city}")
def weather(city: str):
    return get_weather(city)


# test risk API without OpenWeather,used only for development/demo
@app.get("/test-risk")
def test_risk():
    sample_weather = {
        "city": "Tbilisi",
        "temperature": 25,
        "weather": "heavy rain",
        "wind_speed": 5
    }

    return analyze_risk(sample_weather)


# create fixed test alert, used only for development/demo
@app.post("/create-alert")
def create_alert(db: Session = Depends(get_db)):
    new_alert = Alert(
        city="Tbilisi",
        risk_level="High",
        disaster_type="Flood",
        recommendation="Avoid rivers and stay indoors."
    )

    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)

    return {
        "message": "Alert saved successfully",
        "alert_id": new_alert.id
    }


# generate alert from real OpenWeather data
@app.post("/generate-alert/{city}")
def generate_alert(city: str, db: Session = Depends(get_db)):
    weather_data = get_weather(city)

    if "error" in weather_data:
        return weather_data

    new_alert = Alert(
        city=weather_data["city"],
        risk_level=weather_data["risk_level"],
        disaster_type=weather_data["disaster_type"],
        recommendation=weather_data["recommendation"]
    )

    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)

    return {
        "message": "Alert generated and saved successfully",
        "weather": weather_data,
        "alert_id": new_alert.id
    }


# get all alerts, newest first
@app.get("/alerts")
def get_alerts(db: Session = Depends(get_db)):
    alerts = (
        db.query(Alert)
        .order_by(Alert.created_at.desc())
        .all()
    )

    return alerts


# get alerts by city, newest first
@app.get("/alerts/{city}")
def get_alerts_by_city(city: str, db: Session = Depends(get_db)):
    alerts = (
        db.query(Alert)
        .filter(Alert.city == city)
        .order_by(Alert.created_at.desc())
        .all()
    )

    return alerts


# get only dangerous alerts by city, newest first
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

@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()

    return users

@app.get("/users/{region}")
def get_users_by_region(region: str, db: Session = Depends(get_db)):
    users = db.query(User).filter(User.region == region).all()

    return users

@app.post("/generate-alert-for-region/{region}")
def generate_alert_for_region(region: str, db: Session = Depends(get_db)):
    users = db.query(User).filter(User.region == region).all()

    if not users:
        return {"error": "No users found in this region"}

    weather_data = get_weather(region)

    if "error" in weather_data:
        return weather_data

    new_alert = Alert(
        city=region,
        risk_level=weather_data["risk_level"],
        disaster_type=weather_data["disaster_type"],
        recommendation=weather_data["recommendation"]
    )

    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)

    return {
        "message": "Alert generated for region users",
        "region": region,
        "affected_users": len(users),
        "alert_id": new_alert.id,
        "weather": weather_data
    }

@app.get("/active-alerts")
def get_active_alerts(db: Session = Depends(get_db)):
    alerts = (
        db.query(Alert)
        .filter(Alert.disaster_type != "No danger")
        .order_by(Alert.created_at.desc())
        .all()
    )

    return alerts

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "API is running"
    }

@app.get("/api-info")
def api_info():
    return {
        "project": "Natural Disaster Early Warning System",
        "version": "1.0",
        "features": [
            "User registration",
            "User login with JWT",
            "Weather data integration",
            "Risk analysis",
            "Alert generation",
            "Region-based alerts"
        ]
    }

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

@app.put("/users/{user_id}/region")
def update_user_region(
    user_id: int,
    new_region: str,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return {"error": "User not found"}

    user.region = new_region

    db.commit()
    db.refresh(user)

    return {
        "message": "User region updated successfully",
        "user_id": user.id,
        "new_region": user.region
    }

@app.put("/me/region")
def update_my_region(
        new_region: str,
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

    user.region = new_region

    db.commit()
    db.refresh(user)

    return{
        "message": "Your region updated successfully",
        "user_id": user.id,
        "new_region": user.region
    }