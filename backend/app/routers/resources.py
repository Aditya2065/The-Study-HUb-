from fastapi import APIRouter

from app.data.store import RESOURCES
from app.schemas import Resource

router = APIRouter(prefix="/resources", tags=["resources"])


@router.get("", response_model=list[Resource])
def get_resources() -> list[Resource]:
    return RESOURCES
