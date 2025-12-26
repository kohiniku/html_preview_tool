from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "HTML Preview Tool"
    api_v1_prefix: str = "/api"
    database_url: str = "sqlite:///./app.db"
    proxy_url: str | None = None
    no_proxy: str | None = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


@lru_cache
def get_settings() -> Settings:
    return Settings()
