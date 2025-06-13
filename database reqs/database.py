# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# This URL will create a file tasks.db in this folder
SQLALCHEMY_DATABASE_URL = "sqlite:///./tasks.db"

# Create the engine and session factory
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},  # only for SQLite
)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for your ORM models
Base = declarative_base()
