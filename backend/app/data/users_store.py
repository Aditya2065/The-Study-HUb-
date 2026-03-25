import hashlib
import json
import threading
from pathlib import Path


_LOCK = threading.Lock()

USERS_DIR = Path(__file__).resolve().parents[2] / "data"
USERS_FILE = USERS_DIR / "users.json"

DEFAULT_USER_ID = "User"
DEFAULT_PASSWORD = "User"


def _hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def _ensure_file_initialized() -> None:
    if USERS_FILE.exists():
        return

    USERS_DIR.mkdir(parents=True, exist_ok=True)
    default_payload = {
        "users": {
            DEFAULT_USER_ID: {"password_hash": _hash_password(DEFAULT_PASSWORD)},
        }
    }
    USERS_FILE.write_text(json.dumps(default_payload, indent=2), encoding="utf-8")


def load_users() -> dict[str, dict]:
    with _LOCK:
        _ensure_file_initialized()
        raw = USERS_FILE.read_text(encoding="utf-8")
        data = json.loads(raw) if raw.strip() else {}
        return data.get("users", {})  # {userId: {password_hash: ...}}


def save_users(users: dict[str, dict]) -> None:
    with _LOCK:
        USERS_DIR.mkdir(parents=True, exist_ok=True)
        USERS_FILE.write_text(json.dumps({"users": users}, indent=2), encoding="utf-8")


def user_exists(user_id: str) -> bool:
    users = load_users()
    return user_id in users


def create_user(user_id: str, password: str) -> None:
    users = load_users()
    users[user_id] = {"password_hash": _hash_password(password)}
    save_users(users)


def verify_user(user_id: str, password: str) -> bool:
    users = load_users()
    if user_id not in users:
        return False
    return users[user_id].get("password_hash") == _hash_password(password)
