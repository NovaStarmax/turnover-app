from pydantic import BaseModel


class MetricsOut(BaseModel):
    status: str
    requests_24h: int
    avg_latency_ms: int
    errors_24h: int
    last_batch_date: str
    employees_scored: int


class AuditLog(BaseModel):
    timestamp: str
    actor: str
    resource: str
    method: str


class AuditLogsOut(BaseModel):
    total: int
    logs: list[AuditLog]
