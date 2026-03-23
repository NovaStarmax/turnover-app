from fastapi import APIRouter, HTTPException, Depends
from services import user_service
from schemas.user import UserOut, UpdateRoleRequest
from core.dependencies import get_current_user, require_role

router = APIRouter()


@router.get("/me", response_model=UserOut)
def get_me(current_user: dict = Depends(get_current_user)):
    user = user_service.get_by_email(current_user["sub"])
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    return user


@router.get(
    "/",
    response_model=list[UserOut],
    dependencies=[Depends(require_role(["RH_ADMIN"]))],
)
def get_users():
    return user_service.get_all()


@router.patch("/{user_id}/role", response_model=UserOut)
def update_role(
    user_id: int,
    body: UpdateRoleRequest,
    current_user: dict = Depends(require_role(["RH_ADMIN"])),
):
    me = user_service.get_by_email(current_user["sub"])
    if me and me["id"] == user_id:
        raise HTTPException(
            status_code=400, detail="Vous ne pouvez pas modifier votre propre rôle"
        )

    updated = user_service.update_role(user_id, body.role)
    if not updated:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

    return updated
