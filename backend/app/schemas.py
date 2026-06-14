# Pydantic schemas გამოიყენება API-ში მიღებული მონაცემების ვალიდაციისთვის
from pydantic import BaseModel, field_validator
from datetime import date
import re
from typing import Optional

# მომხმარებლის რეგისტრაციის schema
# განსაზღვრავს რა მონაცემები უნდა მიიღოს /register endpoint-მა
class UserCreate(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
    phone: str
    password: str
    region: str
    city: str
    accepted_terms: bool

    # ქართული ტელეფონის ნომრის ფორმატის შემოწმება
    # დასაშვები ფორმატი: +9955XXXXXXXX
    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value):

        pattern = r"^\+9955\d{8}$"

        if not re.match(pattern, value):
            raise ValueError(
                "ტელეფონის ნომერი უნდა იყოს შემდეგი ფორმატის: +9955XXXXXXXX"
            )
        return value

    # პაროლის მინიმალური სიგრძის შემოწმება
    @field_validator("password")
    @classmethod
    def validate_password(cls, value):
        if len(value) < 6:
            raise ValueError("პაროლი უნდა შედგებოდეს მინიმუმ 6 ასოსგან")

        return value

# ავტორიზაციის schema
# გამოიყენება /login endpoint-ში
class UserLogin(BaseModel):
    phone: str
    password: str

# მომხმარებლის მდებარეობის განახლების schema
# გამოიყენება /me/location endpoint-ში
class LocationUpdate(BaseModel):
    region: str
    city: str