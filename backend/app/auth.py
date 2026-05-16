from passlib.context import CryptContext

# ვაიძულებთ bcrypt backend-ს გამოყენებას
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12
)

def hash_password(password: str):
    # პაროლის დაშიფვრა
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    # პაროლის შემოწმება
    return pwd_context.verify(plain_password, hashed_password)