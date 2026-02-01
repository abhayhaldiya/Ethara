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

## API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `DELETE /api/employees/{employee_id}` - Delete employee

### Attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/{employee_id}` - Get attendance for specific employee
- `POST /api/attendance` - Mark attendance

## Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy using the provided `render.yaml` configuration

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Live Application
- **Frontend URL**: [To be updated after deployment]
- **Backend API**: [To be updated after deployment]

## Assumptions & Limitations
- Single admin user (no authentication required)
- Basic CRUD operations only
- No advanced HR features (payroll, leave management)
- Simple attendance tracking (Present/Absent only)

## Future Enhancements
- User authentication and authorization
- Advanced reporting and analytics
- Employee profile pictures
- Bulk attendance operations
- Export functionality

## Deployment Guide

### Backend Deployment (Render)

1. **Create a new Web Service on Render:**
   - Connect your GitHub repository
   - Select the `backend` folder as the root directory
   - Use the following settings:
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

2. **Set up PostgreSQL Database:**
   - Create a new PostgreSQL database on Render
   - Copy the database connection string

3. **Configure Environment Variables:**
   ```
   DATABASE_URL=<your-render-postgresql-url>
   CORS_ORIGINS=https://your-frontend-domain.vercel.app,http://localhost:3000
   ```

4. **Deploy and Test:**
   - The service will automatically deploy
   - Test the API at: `https://your-backend-url.onrender.com/docs`

### Frontend Deployment (Vercel)

1. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Select the `frontend` folder as the root directory
   - Vercel will automatically detect it's a React app

2. **Configure Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

3. **Deploy:**
   - Vercel will automatically build and deploy
   - Your app will be available at: `https://your-app.vercel.app`

### Alternative: Railway Deployment

For Railway backend deployment:

1. **Create new project on Railway**
2. **Connect GitHub repository**
3. **Add PostgreSQL database service**
4. **Configure environment variables:**
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   CORS_ORIGINS=https://your-frontend-domain.vercel.app
   ```
5. **Deploy automatically on push**

## Testing the Application

### Manual Testing Checklist

**Employee Management:**
- [ ] Add new employee with valid data
- [ ] Try adding employee with duplicate ID (should fail)
- [ ] Try adding employee with invalid email (should fail)
- [ ] View all employees in table
- [ ] Delete an employee
- [ ] Verify employee deletion removes attendance records

**Attendance Management:**
- [ ] Mark attendance for an employee
- [ ] Try marking attendance for same employee/date (should update)
- [ ] View all attendance records
- [ ] Filter attendance by employee
- [ ] Verify attendance shows correct employee names

**Dashboard:**
- [ ] View total employee count
- [ ] Check present/absent counts for today
- [ ] Verify quick action links work

### API Testing

Test the API endpoints using the interactive documentation at `/docs`:

```bash
# Health check
GET /health

# Employee endpoints
GET /api/employees
POST /api/employees
DELETE /api/employees/{employee_id}

# Attendance endpoints  
GET /api/attendance
GET /api/attendance/{employee_id}
POST /api/attendance
```

## Troubleshooting

### Common Issues

**Backend Issues:**
- **Database connection errors**: Check DATABASE_URL format
- **CORS errors**: Verify CORS_ORIGINS includes your frontend URL
- **Import errors**: Ensure all dependencies are installed

**Frontend Issues:**
- **API connection errors**: Check REACT_APP_API_URL is correct
- **Build errors**: Ensure all dependencies are installed with `npm install`
- **Routing issues**: Verify vercel.json is configured for SPA routing

**Deployment Issues:**
- **Backend not starting**: Check start command and PORT environment variable
- **Database migrations**: Run `alembic upgrade head` after deployment
- **Environment variables**: Ensure all required variables are set in deployment platform

### Performance Considerations

- Database indexes are automatically created for frequently queried fields
- API responses are kept minimal to reduce payload size
- Frontend uses React's built-in optimizations
- Consider adding pagination for large datasets in production

## Security Notes

- No authentication implemented (as per requirements)
- Input validation on both frontend and backend
- SQL injection protection via SQLAlchemy ORM
- CORS properly configured for production domains
- Environment variables used for sensitive configuration

## Future Enhancements

**Phase 1:**
- User authentication and role-based access
- Employee profile pictures and additional details
- Bulk attendance operations
- Advanced filtering and search

**Phase 2:**
- Reporting and analytics dashboard
- Email notifications for attendance
- Mobile-responsive improvements
- Data export functionality

**Phase 3:**
- Leave management system
- Performance tracking
- Integration with external HR systems
- Advanced reporting with charts