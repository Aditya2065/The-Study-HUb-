from fastapi import APIRouter

from app.data.store import COURSES

router = APIRouter(prefix="/courses", tags=["courses"])


@router.get("", response_model=list[str])
def get_courses(year: str = "FYBCS") -> list[str]:
    return COURSES.get(year, COURSES["FYBCS"])
