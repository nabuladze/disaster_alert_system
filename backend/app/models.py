# SQLAlchemy მოდელები (Database Tables)
from sqlalchemy import Column, Integer, String, DateTime, Date, Boolean
from datetime import datetime, timezone, timedelta
from app.database import Base

# საქართველოს დროის მიღება alert-ების timestamp-ისთვის
def georgia_time():
    return datetime.now(timezone(timedelta(hours=4)))


# User ცხრილი მონაცემთა ბაზაში
class User(Base):
    __tablename__ = "users"

    # უნიკალური ID თითოეული მომხმარებლისთვის
    id = Column(Integer, primary_key=True, index=True)

    first_name = Column(String)
    last_name = Column(String)
    date_of_birth = Column(Date)

    # phone number უნდა იყოს უნიკალური
    phone = Column(String, unique=True, index=True)

    # დაშიფრული პაროლი
    password = Column(String)

    region = Column(String)
    city = Column(String)

    accepted_terms = Column(Boolean, default=False)


# Alert ცხრილი
class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)

    # რომელ მომხმარებელს ეკუთვნის შეტყობინება
    user_id = Column(Integer, index=True)

    city = Column(String, index=True)
    risk_level = Column(String)
    disaster_type = Column(String)
    recommendation = Column(String)

    # საქართველოს დრო
    created_at = Column(DateTime, default=georgia_time)