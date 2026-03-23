from fastapi import APIRouter, Depends, HTTPException
from core.dependencies import require_role
from schemas.auth import LoginRequest, LoginResponse, RegisterRequest, RegisterResponse
from services import auth_service

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
def login(body: LoginRequest):
    result = auth_service.login(body.email, body.password)

    if not result:
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")

    return result


@router.post(
    "/register",
    response_model=RegisterResponse,
    dependencies=[Depends(require_role(["RH_ADMIN"]))],
)
def register(body: RegisterRequest):
    result = auth_service.register(body.email, body.role)

    if not result:
        raise HTTPException(
            status_code=409,
            detail="Un compte avec cet email existe déjà",
        )

    return result
