from mock_data import users
from core.security import create_access_token


def login(email: str, password: str) -> dict | None:
    """
    Verifies the credentials.
    Returns the token + role if OK, None if invalid.
    """
    # Look for the user by email
    user = next((u for u in users if u["email"] == email), None)

    # User not found
    if not user:
        return None

    # Wrong password
    # In prod: we would compare with a bcrypt hash
    if user["password"] != password:
        return None

    # Credentials OK — generate the token
    token = create_access_token(
        {
            "sub": user["email"],  # "sub" = subject, JWT convention
            "role": user["role"],
            "name": user["name"],
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user["role"],
        "name": user["name"],
    }
