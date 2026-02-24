from fastapi import APIRouter, HTTPException
from schemas.auth import LoginRequest, LoginResponse
from services import auth_service

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
def login(body: LoginRequest):
    """
    body is automatically parsed from the request JSON
    thanks to the LoginRequest schema
    """
    result = auth_service.login(body.email, body.password)

    if not result:
        # 401 = Unauthorized — invalid credentials
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")

    return result
