from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional

class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

class EmployeeResponse(BaseModel):
    id: int
    employee_id: str
    full_name: str
    email: str
    department: str
    
    class Config:
        from_attributes = True

class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: str  # "Present" or "Absent"

class AttendanceResponse(BaseModel):
    id: int
    employee_id: str
    date: date
    status: str
    
    class Config:
        from_attributes = True