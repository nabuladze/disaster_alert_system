# passlib ბიბლიოთეკიდან შემოგვაქვს CryptContext.
# CryptContext გამოიყენება პაროლის დაშიფვრისა და შემოწმებისთვის.
from passlib.context import CryptContext


# ვქმნით პაროლის დაშიფვრის კონფიგურაციას.
# schemes=["bcrypt_sha256"] ნიშნავს, რომ პაროლი დაიშიფრება bcrypt_sha256 ალგორითმით.
# deprecated="auto" ნიშნავს, რომ ძველი/მოძველებული hashing მეთოდები ავტომატურად აღარ იქნება რეკომენდებული.
pwd_context = CryptContext(
    schemes=["bcrypt_sha256"],
    deprecated="auto"
)


# ეს ფუნქცია იღებს ჩვეულებრივ პაროლს და აბრუნებს დაშიფრულ ვერსიას.
# გამოიყენება რეგისტრაციის დროს, რათა პაროლი ბაზაში ღია ტექსტით არ შეინახოს.
def hash_password(password: str):
    return pwd_context.hash(password)


# ეს ფუნქცია ამოწმებს მომხმარებლის მიერ შეყვანილ პაროლს
# ბაზაში შენახულ დაშიფრულ პაროლთან.
# plain_password არის მომხმარებლის მიერ შეყვანილი პაროლი.
# hashed_password არის ბაზაში შენახული დაშიფრული პაროლი.
# თუ პაროლები ემთხვევა, აბრუნებს True-ს, წინააღმდეგ შემთხვევაში False-ს.
def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)