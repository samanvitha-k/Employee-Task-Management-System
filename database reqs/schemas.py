from pydantic import BaseModel
from datetime import date, time
from typing import Optional

class TaskBase(BaseModel):
    title: str
    due_date: Optional[date] = None
    status: Optional[str] = "pending"

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    
    class Config:
        from_attributes = True
    
class AssignPayload(BaseModel):
    user: str
    
class TaskAssign(BaseModel):
    assignee: str
    company: str
    title: str
    status: str
    allocation_date: Optional[date] = None
    deadline: Optional[date] = None
    
    class Config:
        from_attributes = True

