from mock_data import users


def get_all() -> list:
    return [
        {"id": u["id"], "email": u["email"], "role": u["role"], "name": u["name"]}
        for u in users
    ]


def get_by_email(email: str) -> dict | None:
    user = next((u for u in users if u["email"] == email), None)
    if not user:
        return None
    return {
        "id": user["id"],
        "email": user["email"],
        "role": user["role"],
        "name": user["name"],
    }


def update_role(user_id: int, new_role: str) -> dict | None:
    user = next((u for u in users if u["id"] == user_id), None)
    if not user:
        return None

    user["role"] = new_role

    return {
        "id": user["id"],
        "email": user["email"],
        "role": user["role"],
        "name": user["name"],
    }
