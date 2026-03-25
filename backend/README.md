# Backend Run Guide

Run these commands from the `backend` folder in VS Code terminal:

```bash
py -m pip install -r requirements.txt
py -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

Backend URLs after start:

- `http://127.0.0.1:8000/`
- `http://127.0.0.1:8000/docs`
