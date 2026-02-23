from pydantic import BaseModel


class ShapFactor(BaseModel):
    label: str
    detail: str
    contribution: float
    positive: bool


class PredictionOut(BaseModel):
    employee_id: str
    score: float
    risk: str
    trend: str
    batch_date: str
    shap_factors: list[ShapFactor]
