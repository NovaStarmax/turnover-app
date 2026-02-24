from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from core.security import decode_access_token

# Tells FastAPI where to find the token
# It will look in the header: Authorization: Bearer <token>
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """
    Called automatically on each protected route.
    Returns the token payload if valid.
    Raises a 401 if invalid or expired.
    """
    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return payload  # { "sub": email, "role": ..., "name": ... }


def require_role(allowed_roles: list[str]):
    """
    Dependency that checks the role in addition to the token.
    Used like this: Depends(require_role(["RH_ADMIN"]))
    """

    def check_role(current_user: dict = Depends(get_current_user)):
        if current_user["role"] not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied — insufficient role",
            )
        return current_user

    return check_role
