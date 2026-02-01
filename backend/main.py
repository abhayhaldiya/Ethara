from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import os
from dotenv import load_dotenv

from database import get_db, engine
from models import Base, Employee, Attendance
from schemas import EmployeeCreate, EmployeeResponse, AttendanceCreate, AttendanceResponse

load_dotenv()

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "HRMS Lite API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Employee endpoints
@app.post("/api/employees", response_model=EmployeeResponse)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    # Check if employee ID already exists
    existing_employee = db.query(Employee).filter(Employee.employee_id == employee.employee_id).first()
    if existing_employee:
        raise HTTPException(status_code=400, detail="Employee ID already exists")
    
    # Check if email already exists
    existing_email = db.query(Employee).filter(Employee.email == employee.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    db_employee = Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

@app.get("/api/employees", response_model=List[EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    employees = db.query(Employee).all()
    return employees

@app.delete("/api/employees/{employee_id}")
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Delete associated attendance records
    db.query(Attendance).filter(Attendance.employee_id == employee_id).delete()
    
    db.delete(employee)
    db.commit()
    return {"message": "Employee deleted successfully"}

# Attendance endpoints
@app.post("/api/attendance", response_model=AttendanceResponse)
def mark_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    # Check if employee exists
    employee = db.query(Employee).filter(Employee.employee_id == attendance.employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Check if attendance already marked for this date
    existing_attendance = db.query(Attendance).filter(
        Attendance.employee_id == attendance.employee_id,
        Attendance.date == attendance.date
    ).first()
    
    if existing_attendance:
        # Update existing attendance
        existing_attendance.status = attendance.status
        db.commit()
        db.refresh(existing_attendance)
        return existing_attendance
    else:
        # Create new attendance record
        db_attendance = Attendance(**attendance.dict())
        db.add(db_attendance)
        db.commit()
        db.refresh(db_attendance)
        return db_attendance

@app.get("/api/attendance", response_model=List[AttendanceResponse])
def get_all_attendance(db: Session = Depends(get_db)):
    attendance_records = db.query(Attendance).join(Employee).all()
    return attendance_records

@app.get("/api/attendance/{employee_id}", response_model=List[AttendanceResponse])
def get_employee_attendance(employee_id: str, db: Session = Depends(get_db)):
    # Check if employee exists
    employee = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    attendance_records = db.query(Attendance).filter(Attendance.employee_id == employee_id).all()
    return attendance_records