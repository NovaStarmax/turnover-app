import random
import string
from mock_data import users
from core.security import create_access_token


def login(email: str, password: str) -> dict | None:
    user = next((u for u in users if u["email"] == email), None)
    if not user:
        return None
    if user["password"] != password:
        return None

    token = create_access_token(
        {
            "sub": user["email"],
            "role": user["role"],
            "name": user["name"],
            "service": user.get("service"),
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user["role"],
        "name": user["name"],
    }


def generate_temp_password(length: int = 10) -> str:
    chars = string.ascii_letters + string.digits
    return "".join(random.choices(chars, k=length))


def register(email: str, role: str) -> dict | None:
    existing = next((u for u in users if u["email"] == email), None)
    if existing:
        return None

    temp_password = generate_temp_password()

    new_user = {
        "id": len(users) + 1,
        "email": email,
        "password": temp_password,
        "role": role,
        "name": email.split("@")[0],
    }

    users.append(new_user)

    return {
        "email": email,
        "role": role,
        "temp_password": temp_password,
        "message": "Utilisateur créé. Mot de passe temporaire à transmettre.",
    }
