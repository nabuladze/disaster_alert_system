#database setup
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

#SQLite მონაცემთა ბაზის მისამართი
DATABASE_URL = "sqlite:///./db/app.db"

#ქმნის DB engine-ს
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

#DB სესია, რომლის საშუალებითაც ვწერთ/ვკითხულობთ მონაცემებს
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

#base კლასი ყველა მოდელისთვის
Base = declarative_base()

#ფუნქცია DB სესიის მისაღებად
def get_db():
    db = SessionLocal()
    try:
        yield db #ვაბრუნებთ სესიას API-სთვის
    finally:
        db.close() #ბოლოს ყოველთვის ვხურავთ კავშირს.