from pydantic import BaseModel


class LoginRequest(BaseModel):
    email: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    role: str
    name: str


class RegisterRequest(BaseModel):
    email: str
    role: str


class RegisterResponse(BaseModel):
    email: str
    role: str
    temp_password: str
    message: str
