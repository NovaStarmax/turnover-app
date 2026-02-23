from pydantic import BaseModel


class EmployeeOut(BaseModel):
    id: str
    name: str
    service: str
    tenure: str
    score: float
    risk: str
