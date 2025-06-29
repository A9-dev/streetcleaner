from fastapi import FastAPI
from pydantic_settings import BaseSettings, SettingsConfigDict
from src.api.v1 import router as api_router


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env.local", extra="allow")


settings = Settings()
app = FastAPI()
app.include_router(api_router, prefix="/api/v1")
