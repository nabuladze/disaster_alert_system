#მონაცემების ვალიდაცია
from pydantic import BaseModel, field_validator
from datetime import date
import re
from typing import Optional

#რეგისტრაციის schema
class UserCreate(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
    phone: str
    password: str
    region: str
    city: str
    accepted_terms: bool

    #ქართული ტელეფონის ნომრის ვალიდაცია
    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value):

        pattern = r"^\+9955\d{8}$"

        if not re.match(pattern, value):
            raise ValueError(
                "Phone number must be in format +9955XXXXXXXX"
            )
        return value

# login schema
class UserLogin(BaseModel):
    phone: str
    password: str

class LocationUpdate(BaseModel):
    region: str
    city: str