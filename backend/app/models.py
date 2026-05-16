#user model
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base

#User ცხრილი მონაცემთა ბაზაში
class User(Base):
    __tablename__ = "users"

    #უნიკალური ID თითოეული მომხმარებლისთვის
    id = Column(Integer, primary_key=True, index=True)

    #email უნდა იყოს უნიკალური
    email = Column(String, unique=True, index=True)

    #დაშიფრული პაროლი ინახება აქ
    password = Column(String)

    #მომხმარებლის რეგიონი
    region = Column(String)

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    city = Column(String, index=True)
    risk_level = Column(String)
    disaster_type = Column(String)
    recommendation = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)