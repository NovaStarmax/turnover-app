from pydantic import BaseModel


class MetricsOut(BaseModel):
    status: str
    requests_24h: int
    avg_latency_ms: int
    errors_24h: int
    last_batch_date: str
    employees_scored: int
    turnover_rate: int
    cost_avoided: int


class DriftVariable(BaseModel):
    label: str
    drift_pct: float
    color: str


class ModelOut(BaseModel):
    version: str
    algorithm: str
    trained_at: str
    data_range: str
    recall: float
    auc_roc: float
    recall_threshold: float
    auc_threshold: float
    last_evaluation: str
    drift_variables: list[DriftVariable]


class AuditLog(BaseModel):
    timestamp: str
    actor: str
    resource: str
    method: str


class AuditLogsOut(BaseModel):
    total: int
    logs: list[AuditLog]
