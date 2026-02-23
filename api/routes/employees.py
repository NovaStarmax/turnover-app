from fastapi import APIRouter, HTTPException, Query
from services import employee_service
from schemas.employee import EmployeeOut

router = APIRouter()


@router.get("/", response_model=list[EmployeeOut])
def get_employees(
    service: str | None = Query(default=None),
    risk: str | None = Query(default=None),
):
    return employee_service.get_all(service, risk)


@router.get("/{employee_id}", response_model=EmployeeOut)
def get_employee(employee_id: str):
    emp = employee_service.get_by_id(employee_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employé non trouvé")
    return emp
