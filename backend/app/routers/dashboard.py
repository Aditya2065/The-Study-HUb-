from fastapi import APIRouter

from app.data.store import DASHBOARD
from app.schemas import DashboardResponse

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("", response_model=DashboardResponse)
def get_dashboard() -> DashboardResponse:
    return DASHBOARD
