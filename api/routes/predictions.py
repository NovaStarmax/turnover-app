from fastapi import APIRouter, HTTPException, Query, Depends
from services import prediction_service
from mock_data import employees
from schemas.prediction import PredictionOut
from core.dependencies import get_current_user, require_role

router = APIRouter()


@router.get(
    "/",
    response_model=list[PredictionOut],
    dependencies=[Depends(require_role(["RH_ADMIN", "RH_STANDARD"]))],
)
def get_predictions(
    risk: str | None = Query(default=None),
    service: str | None = Query(default=None),
):
    return prediction_service.get_all(risk, service, employees)


@router.get("/{employee_id}", response_model=PredictionOut)
def get_prediction(employee_id: str, _: dict = Depends(get_current_user)):
    prediction = prediction_service.get_by_employee_id(employee_id)

    if not prediction:
        raise HTTPException(status_code=404, detail="Prédiction non trouvée")

    return prediction
