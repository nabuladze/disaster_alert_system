from jose import JWTError, jwt
from datetime import datetime, timedelta

#საიდუმლო key (რეალურ პროექტში, .env ფაილში ინახება)
SECRET_KEY = "supersecretkey123"

#ალგორითმი ტოკენის დასაშიფრად
ALGORITHM = "HS256"

#ტოკენის სიცოცხლის დრო (წუთებში)
ACCESS_TOKEN_EXPIRE_MINUTE = 30


#JWT ტოკენის შექმნა
def create_access_token(data: dict):

    #ვაკოპირებთ მონაცემებს
    to_encode = data.copy()

    #ვადგენთ ვადის გასვლის დროს
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTE)

    #ვამატებთ ვადის ინფორმაციას
    to_encode.update({"exp": expire})

    #ვშიფრავთ JWT ტოკენად
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt

