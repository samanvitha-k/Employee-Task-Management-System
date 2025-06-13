# main.py
from typing import List
import os
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel
from sqlalchemy.orm import Session

import models, schemas
from database import SessionLocal, engine, Base

# ─── CONFIG ───────────────────────────────
SECRET_KEY = "SECRET_KEY"        # ← change in prod, or load from ENV
ALGORITHM  = "HS256"

# Create the SQLite tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# ─── CORS & STATIC ────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
if os.path.isdir("build"):
    app.mount("/", StaticFiles(directory="build", html=True), name="frontend")

# ─── AUTH MODELS & DEPENDENCIES ──────────
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

class LoginData(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    
    

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme)) -> str:
    creds_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = payload.get("sub")
        if not user:
            raise creds_exc
    except JWTError:
        raise creds_exc
    return user

# ─── LOGIN ENDPOINT ───────────────────────
@app.post("/login", response_model=Token)
def login(data: LoginData):
    # replace with real lookup
    if data.email == "admin@example.com" and data.password == "password":
        token = jwt.encode({"sub": data.email}, SECRET_KEY, algorithm=ALGORITHM)
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

# ─── CRUD WITH PROTECTION ──────────────────
@app.get("/tasks/", response_model=List[schemas.Task])
def read_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()

@app.post("/tasks/", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = models.Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get("/tasks/{task_id}", response_model=schemas.Task)
def read_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, updated: schemas.TaskCreate, db: Session = Depends(get_db)):
    task = db.query(models.Task).get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, val in updated.dict().items():
        setattr(task, key, val)
    db.commit()
    db.refresh(task)
    return task

@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return None

@app.post("/tasks/{task_id}/assign", response_model=schemas.Task)
def assign_task(
  task_id:int,
  payload:schemas.TaskAssign,
  db:Session=Depends(get_db),
  user:str=Depends(get_current_user)
):
  task = db.query(models.Task).get(task_id)
  if not task: raise HTTPException(404,"Task not found")
  for k,v in payload.dict(exclude_unset=True).items():
    setattr(task, k, v)
  task.assigned_by = user
  db.commit(); db.refresh(task)
  return task

if __name__ == "__main__":
    # change host="0.0.0.0" if you need external access
    app.run(debug=True, port=5000)


