# HRMS Lite - Human Resource Management System

A lightweight web-based HRMS application for managing employee records and tracking daily attendance.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Python FastAPI
- **Database**: PostgreSQL
- **Deployment**: Vercel (Frontend) + Render (Backend)

## Features

### Employee Management
- Add new employees with unique ID, name, email, and department
- View all employees in a clean table format
- Delete employees
- Form validation and error handling

### Attendance Management
- Mark daily attendance (Present/Absent) for employees
- View attendance records for each employee
- Date-based attendance tracking

## Project Structure

```
hrms-lite/
├── frontend/          # React application
├── backend/           # FastAPI application
├── README.md
└── requirements.txt
```

## Local Development Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL 12+

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your PostgreSQL database URL
   # Example: DATABASE_URL=postgresql://username:password@localhost:5432/hrms_lite
   ```

5. Initialize database (first time only):
   ```bash
   alembic init alembic  # Only if alembic folder doesn't exist
   alembic revision --autogenerate -m "Initial migration"
   alembic upgrade head
   ```

6. Start the server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your backend API URL
   # Example: REACT_APP_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
