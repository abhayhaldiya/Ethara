#!/usr/bin/env python3
"""
Database initialization script for HRMS Lite
Run this script to create tables and add sample data
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from datetime import date, timedelta

from models import Base, Employee, Attendance

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://username:password@localhost:5432/hrms_lite")

def init_database():
    """Initialize database with tables and sample data"""
    
    print("🔧 Initializing HRMS Lite Database...")
    
    # Create engine and session
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    # Create all tables
    print("📋 Creating database tables...")
    Base.metadata.create_all(bind=engine)
    
    # Create session
    db = SessionLocal()
    
    try:
        # Check if data already exists
        existing_employees = db.query(Employee).count()
        if existing_employees > 0:
            print(f"⚠️  Database already has {existing_employees} employees. Skipping sample data.")
            return
        
        # Add sample employees
        print("👥 Adding sample employees...")
        sample_employees = [
            Employee(
                employee_id="EMP001",
                full_name="John Doe",
                email="john.doe@company.com",
                department="Engineering"
            ),
            Employee(
                employee_id="EMP002", 
                full_name="Jane Smith",
                email="jane.smith@company.com",
                department="Human Resources"
            ),
            Employee(
                employee_id="EMP003",
                full_name="Mike Johnson", 
                email="mike.johnson@company.com",
                department="Marketing"
            ),
            Employee(
                employee_id="EMP004",
                full_name="Sarah Wilson",
                email="sarah.wilson@company.com", 
                department="Sales"
            ),
            Employee(
                employee_id="EMP005",
                full_name="David Brown",
                email="david.brown@company.com",
                department="Finance"
            )
        ]
        
        for employee in sample_employees:
            db.add(employee)
        
        db.commit()
        print(f"✅ Added {len(sample_employees)} sample employees")
        
        # Add sample attendance records for the last 7 days
        print("📅 Adding sample attendance records...")
        attendance_records = []
        
        for i in range(7):  # Last 7 days
            attendance_date = date.today() - timedelta(days=i)
            
            for employee in sample_employees:
                # Simulate realistic attendance (90% present rate)
                import random
                status = "Present" if random.random() > 0.1 else "Absent"
                
                attendance_records.append(Attendance(
                    employee_id=employee.employee_id,
                    date=attendance_date,
                    status=status
                ))
        
        for record in attendance_records:
            db.add(record)
        
        db.commit()
        print(f"✅ Added {len(attendance_records)} sample attendance records")
        
        print("\n🎉 Database initialization completed successfully!")
        print("\nSample data created:")
        print("- 5 employees across different departments")
        print("- 7 days of attendance records")
        print("\nYou can now start the application and explore the features.")
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    init_database()