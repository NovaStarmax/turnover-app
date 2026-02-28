from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
import os

# Secret key that signs the tokens
# In production: environment variable, never hardcoded
SECRET_KEY = os.getenv("SECRET_KEY", "dev_secret_key_change_in_production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(data: dict) -> str:
    """
    Creates a signed JWT token.
    data = what we want to store in the token (email, role...)
    """
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode["exp"] = expire

    # jwt.encode signs the payload with the secret key
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict | None:
    """
    Decodes and verifies a JWT token.
    Returns the payload if valid, None if invalid or expired.
    """
    try:
        payload = jwt.decode(
            token, SECRET_KEY, algorithms=[ALGORITHM]
        )  # Attend une liste, mêne si on en utilise qu’un
        return payload
    except JWTError:
        return None
