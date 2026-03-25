from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.ai import router as ai_router
from app.routers.auth import router as auth_router
from app.routers.courses import router as courses_router
from app.routers.dashboard import router as dashboard_router
from app.routers.resources import router as resources_router

app = FastAPI(title="Study Hub API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Study Hub API is running"}


app.include_router(dashboard_router)
app.include_router(courses_router)
app.include_router(resources_router)
app.include_router(ai_router)
app.include_router(auth_router)
