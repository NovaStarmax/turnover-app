from fastapi import APIRouter, Depends
from services import admin_service
from schemas.admin import MetricsOut, AuditLogsOut
from core.dependencies import require_role

router = APIRouter()


@router.get(
    "/metrics",
    response_model=MetricsOut,
    dependencies=[Depends(require_role(["RH_ADMIN"]))],
)
def get_metrics():
    return admin_service.get_metrics()


@router.get(
    "/audit/logs",
    response_model=AuditLogsOut,
    dependencies=[Depends(require_role(["RH_ADMIN"]))],
)
def get_audit_logs():
    return admin_service.get_audit_logs()
