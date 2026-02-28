from fastapi import APIRouter, Depends
from services import admin_service
from schemas.admin import MetricsOut, AuditLogsOut, ModelOut
from core.dependencies import require_role

router = APIRouter()


@router.get("/metrics", response_model=MetricsOut)
def get_metrics(
    current_user: dict = Depends(require_role(["RH_ADMIN", "RH_STANDARD"])),
):
    return admin_service.get_metrics()


@router.get("/model", response_model=ModelOut)
def get_model(current_user: dict = Depends(require_role(["RH_ADMIN"]))):
    return admin_service.get_model()


@router.get("/audit/logs", response_model=AuditLogsOut)
def get_audit_logs(current_user: dict = Depends(require_role(["RH_ADMIN"]))):
    return admin_service.get_audit_logs()
