#მონაცემების ვალიდაცია
from pydantic import BaseModel

#ეს კლასი განსაზღვრავს თუ როგორ მონაცემებს გვიგზავნის მომხმარებელი რეგისტრაციის დროს
class UserCreate(BaseModel):
    email: str     #მომხმარებლის ელფოსტა
    password: str  #პაროლი (ჯერ დაუშიფრავი)
    region: str    #მომხმარებლის რეგიონი (მაგ: Tbilisi)

#login schema
class UserLogin(BaseModel):
    email: str
    password: str