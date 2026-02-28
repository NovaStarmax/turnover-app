from pydantic import BaseModel


class EmployeeOut(BaseModel):
    id: str
    name: str
    service: str
    tenure: str
    score: float
    risk: str
    contract: str
    position: str
    start_date: str
    absences: int
    last_promotion: str


class HistoryItem(BaseModel):
    date: str
    author: str
    text: str
    type: str


class EmployeeHistoryOut(BaseModel):
    employee_id: str
    history: list[HistoryItem]
