from pydantic import BaseModel


class Task(BaseModel):
    id: int
    title: str
    done: bool


class Assignment(BaseModel):
    id: int
    subject: str
    due: str


class TimetableSlot(BaseModel):
    time: str
    subject: str


class DashboardResponse(BaseModel):
    xp: int
    study_streak: int
    profile_completion: int
    weekly_completed: int
    quizzes: int
    downloads: int
    tasks: list[Task]
    assignments: list[Assignment]
    timetable: list[TimetableSlot]


class Resource(BaseModel):
    id: int
    title: str
    type: str
    url: str


class SummarizeRequest(BaseModel):
    text: str


class SummarizeResponse(BaseModel):
    summary: str


class QuizRequest(BaseModel):
    topic: str


class QuizResponse(BaseModel):
    questions: list[str]


class AuthLoginRequest(BaseModel):
    userId: str
    password: str


class AuthSignupRequest(BaseModel):
    userId: str
    password: str


class AuthResponse(BaseModel):
    token: str
    userId: str


class MeResponse(BaseModel):
    userId: str


class LogoutResponse(BaseModel):
    ok: bool
