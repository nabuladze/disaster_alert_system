from jose import JWTError, jwt
from datetime import datetime, timedelta

# JWT ტოკენის დასაშიფრად გამოყენებული საიდუმლო გასაღები
SECRET_KEY = "supersecretkey123"

# დაშიფვრის ალგორითმი
ALGORITHM = "HS256"

# ტოკენის მოქმედების ხანგრძლივობა წუთებში
ACCESS_TOKEN_EXPIRE_MINUTES = 30


# JWT Access Token-ის შექმნა
# გამოიყენება მომხმარებლის წარმატებული ავტორიზაციის შემდეგ
def create_access_token(data: dict):

    # მიღებული მონაცემების კოპირება
    to_encode = data.copy()

    # ტოკენის ვადის გასვლის დრო
    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    # exp ველის დამატება ტოკენში
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


# JWT ტოკენის ვალიდაცია
# ამოწმებს ტოკენის სისწორესა და მოქმედების ვადას
def verify_token(token: str):

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    # არასწორი ან ვადაგასული ტოკენის შემთხვევაში
    except JWTError:
        return None