from fastapi import APIRouter

from app.schemas import QuizRequest, QuizResponse, SummarizeRequest, SummarizeResponse
from app.services.ai_service import generate_quiz, summarize_text

router = APIRouter(prefix="/ai", tags=["ai"])


@router.post("/summarize", response_model=SummarizeResponse)
def summarize(payload: SummarizeRequest) -> SummarizeResponse:
    return SummarizeResponse(summary=summarize_text(payload.text))


@router.post("/quiz", response_model=QuizResponse)
def quiz(payload: QuizRequest) -> QuizResponse:
    return QuizResponse(questions=generate_quiz(payload.topic))
