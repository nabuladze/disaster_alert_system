from jose import JWTError, jwt
from datetime import datetime, timedelta

# საიდუმლო key
SECRET_KEY = "supersecretkey123"

# ალგორითმი
ALGORITHM = "HS256"

# ტოკენის სიცოცხლის დრო
ACCESS_TOKEN_EXPIRE_MINUTES = 30


# JWT ტოკენის შექმნა
def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


# JWT ტოკენის გადამოწმება
def verify_token(token: str):

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:
        return None