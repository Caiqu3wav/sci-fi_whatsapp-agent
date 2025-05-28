from fastapi import FastAPI
from app.api.routes import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou especifique ["http://localhost:3000"] etc.
    allow_credentials=True,
    allow_methods=["*"],  # ou ["GET", "POST", "OPTIONS", ...]
    allow_headers=["*"],  # ou ["Content-Type", "Authorization"]
)

app.include_router(auth_router, prefix="")