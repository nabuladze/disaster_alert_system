# SQLAlchemy-დან შემოგვაქვს საჭირო კომპონენტები.
# create_engine - ქმნის კავშირს მონაცემთა ბაზასთან.
# sessionmaker - ქმნის DB სესიებს.
# declarative_base - გამოიყენება მოდელების (ცხრილების) შესაქმნელად.
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# SQLite მონაცემთა ბაზის მისამართი.
# sqlite:/// ნიშნავს, რომ ვიყენებთ SQLite ფაილურ ბაზას.
# ./db/app.db მიუთითებს, რომ ბაზის ფაილი მდებარეობს db საქაღალდეში.
DATABASE_URL = "sqlite:///./db/app.db"


# ქმნის Database Engine-ს.
# Engine არის SQLAlchemy-ს მთავარი ობიექტი,
# რომელიც უზრუნველყოფს კავშირს აპლიკაციასა და მონაცემთა ბაზას შორის.
# check_same_thread=False საჭიროა SQLite-სთვის,
# რადგან FastAPI რამდენიმე request-ს ერთდროულად ამუშავებს.
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})


# SessionLocal გამოიყენება ბაზასთან სამუშაო სესიების შესაქმნელად.
# bind=engine ->  რომელ ბაზასთან უნდა იყოს დაკავშირებული.
# autoflush=False ->  ცვლილებები ავტომატურად არ იგზავნება ბაზაში.
# autocommit=False -> commit() ხელით უნდა გამოვიძახოთ.
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


# Base კლასი ყველა Model-ისთვის.
# ყველა ცხრილი (User, Alert და ა.შ.) სწორედ ამ Base კლასის მემკვიდრე იქნება.
Base = declarative_base()

#ფუნქცია DB სესიის მისაღებად
def get_db():
    db = SessionLocal()
    try:
        yield db #ვაბრუნებთ სესიას API-სთვის
    finally:
        db.close() #ბოლოს ყოველთვის ვხურავთ კავშირს.
