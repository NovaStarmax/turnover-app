from pydantic import BaseModel


class UserOut(BaseModel):
    id: int
    email: str
    role: str
    name: str


class UpdateRoleRequest(BaseModel):
    role: str
