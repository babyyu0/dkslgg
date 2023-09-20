from pydantic import BaseModel, Field
from fastapi import Depends, FastAPI, Request
from requests import Session
from sqlalchemy import select

# Routes
from app.match_history.router import router as match_history_router

# Models
# * DB 생성 전 import 하여 불러오기
from app.common.model import *
from app.match_history.model import *
# DB config
from app.database import Base, engine, get_db

app = FastAPI()

# DB Create
Base.metadata.create_all(bind=engine)

# attach routers
app.include_router(match_history_router, prefix="/match-histories", tags=["유저 매치 히스토리"])

@app.get("/")
async def root(request: Request):
    url_list = [
        {"path": route.path, "name": route.name} for route in request.app.routes
    ]
    return url_list