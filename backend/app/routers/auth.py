import secrets
import threading

from fastapi import APIRouter, Header, HTTPException, status

from app.schemas import (
    AuthLoginRequest,
    AuthResponse,
    AuthSignupRequest,
    LogoutResponse,
    MeResponse,
)
from app.data.users_store import create_user, verify_user, user_exists


router = APIRouter(prefix="/auth", tags=["auth"])

_SESSIONS_LOCK = threading.Lock()
_SESSIONS: dict[str, str] = {}  # token -> userId


def _get_user_id_from_token(authorization: str | None) -> str:
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing Authorization header."
        )

    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Authorization header. Expected Bearer token.",
        )

    token = parts[1]
    with _SESSIONS_LOCK:
        user_id = _SESSIONS.get(token)

    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token.")

    return user_id


@router.post("/signup", response_model=AuthResponse)
def signup(payload: AuthSignupRequest) -> AuthResponse:
    user_id = payload.userId.strip()
    password = payload.password

    if not user_id or not password:
        raise HTTPException(status_code=400, detail="User ID and password are required.")

    if user_id == "User" and password == "User":
        # Default account can exist; allow idempotent behavior.
        pass

    if user_exists(user_id):
        raise HTTPException(status_code=400, detail="User ID already exists.")

    create_user(user_id, password)

    token = secrets.token_urlsafe(24)
    with _SESSIONS_LOCK:
        _SESSIONS[token] = user_id

    return AuthResponse(token=token, userId=user_id)


@router.post("/login", response_model=AuthResponse)
def login(payload: AuthLoginRequest) -> AuthResponse:
    user_id = payload.userId.strip()
    password = payload.password

    if verify_user(user_id, password):
        token = secrets.token_urlsafe(24)
        with _SESSIONS_LOCK:
            _SESSIONS[token] = user_id
        return AuthResponse(token=token, userId=user_id)

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials.")


@router.get("/me", response_model=MeResponse)
def me(authorization: str | None = Header(default=None)) -> MeResponse:
    user_id = _get_user_id_from_token(authorization)
    return MeResponse(userId=user_id)


@router.post("/logout", response_model=LogoutResponse)
def logout(authorization: str | None = Header(default=None)) -> LogoutResponse:
    # Validate token and extract session token to remove it.
    _get_user_id_from_token(authorization)
    parts = authorization.split()
    token = parts[1]
    with _SESSIONS_LOCK:
        _SESSIONS.pop(token, None)

    return LogoutResponse(ok=True)

