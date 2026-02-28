from fastapi import APIRouter, HTTPException, Query, Depends
from services import employee_service
from schemas.employee import EmployeeOut, EmployeeHistoryOut
from core.dependencies import get_current_user

router = APIRouter()


@router.get("/", response_model=list[EmployeeOut])
def get_employees(
    service: str | None = Query(default=None),
    risk: str | None = Query(default=None),
    current_user: dict = Depends(get_current_user),
):
    return employee_service.get_all(service, risk)


@router.get("/{employee_id}", response_model=EmployeeOut)
def get_employee(
    employee_id: str,
    current_user: dict = Depends(get_current_user),
):
    emp = employee_service.get_by_id(employee_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employé non trouvé")
    return emp


@router.get("/{employee_id}/history", response_model=EmployeeHistoryOut)
def get_employee_history(
    employee_id: str,
    current_user: dict = Depends(get_current_user),
):
    emp = employee_service.get_by_id(employee_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employé non trouvé")
    return employee_service.get_history(employee_id)
