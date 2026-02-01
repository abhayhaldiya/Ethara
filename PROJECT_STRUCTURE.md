# HRMS Lite - Project Structure

## Overview
```
hrms-lite/
├── README.md                    # Main project documentation
├── PROJECT_STRUCTURE.md         # This file
├── .gitignore                   # Git ignore rules
├── start-dev.sh                 # Development startup script
│
├── backend/                     # FastAPI Backend
│   ├── main.py                  # FastAPI application entry point
│   ├── models.py                # SQLAlchemy database models
│   ├── schemas.py               # Pydantic request/response schemas
│   ├── database.py              # Database connection and session
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example             # Environment variables template
│   ├── Dockerfile               # Docker configuration
│   ├── render.yaml              # Render deployment configuration
│   ├── init_db.py               # Database initialization script
│   ├── alembic.ini              # Alembic configuration
│   └── alembic/                 # Database migrations
│       ├── env.py               # Alembic environment
│       ├── script.py.mako       # Migration template
│       └── versions/            # Migration files (auto-generated)
│
└── frontend/                    # React Frontend
    ├── public/
    │   └── index.html           # HTML template
    ├── src/
    │   ├── index.js             # React entry point
    │   ├── index.css            # Global styles
    │   ├── App.js               # Main App component
    │   ├── components/          # Reusable components
    │   │   ├── Header.js        # Application header
    │   │   ├── Navigation.js    # Navigation menu
    │   │   └── LoadingSpinner.js # Loading component
    │   ├── pages/               # Page components
    │   │   ├── Dashboard.js     # Dashboard page
    │   │   ├── EmployeeManagement.js # Employee CRUD
    │   │   └── AttendanceManagement.js # Attendance tracking
    │   └── services/
    │       └── api.js           # API service layer
    ├── package.json             # Node.js dependencies
    ├── .env.example             # Environment variables template
    └── vercel.json              # Vercel deployment configuration
```

## Backend Architecture

### Core Files

**main.py**
- FastAPI application setup
- CORS middleware configuration
- API route definitions
- Error handling

**models.py**
- SQLAlchemy ORM models
- Database table definitions
- Relationships between entities

**schemas.py**
- Pydantic models for request/response validation
- Data serialization/deserialization
- Type safety and validation rules

**database.py**
- Database connection management
- Session factory
- Database URL configuration

### API Endpoints

```
GET  /                          # Root endpoint
GET  /health                    # Health check
GET  /api/employees             # Get all employees
POST /api/employees             # Create employee
DELETE /api/employees/{id}      # Delete employee
GET  /api/attendance            # Get all attendance
GET  /api/attendance/{emp_id}   # Get employee attendance
POST /api/attendance            # Mark attendance
```

### Database Schema

**employees table:**
- id (Primary Key)
- employee_id (Unique)
- full_name
- email (Unique)
- department

**attendance table:**
- id (Primary Key)
- employee_id (Foreign Key)
- date
- status (Present/Absent)

## Frontend Architecture

### Component Structure

**App.js**
- Main application component
- React Router setup
- Toast notifications setup

**Pages:**
- Dashboard.js - Overview with statistics
- EmployeeManagement.js - CRUD operations for employees
- AttendanceManagement.js - Attendance tracking and viewing

**Components:**
- Header.js - Application branding
- Navigation.js - Menu with active state
- LoadingSpinner.js - Loading indicator

**Services:**
- api.js - Axios HTTP client with API endpoints

### State Management
- React hooks (useState, useEffect)
- Local component state
- No global state management (suitable for app size)

### Styling
- Custom CSS with modern design
- Responsive grid system
- Professional color scheme
- Consistent spacing and typography

## Development Workflow

### Local Development
1. Run `./start-dev.sh` for automated setup
2. Backend runs on http://localhost:8000
3. Frontend runs on http://localhost:3000
4. API docs available at http://localhost:8000/docs

### Database Management
1. Use `python init_db.py` to initialize with sample data
2. Alembic handles schema migrations
3. PostgreSQL for production, SQLite for development

### Code Quality
- Type hints in Python code
- Pydantic validation for API
- Error handling at all levels
- Consistent naming conventions

## Deployment Architecture

### Backend (Render/Railway)
- Containerized Python application
- Managed PostgreSQL database
- Environment-based configuration
- Health checks and monitoring

### Frontend (Vercel)
- Static React build
- CDN distribution
- Environment variable injection
- SPA routing support

### CI/CD
- Git-based deployment
- Automatic builds on push
- Environment-specific configurations
- Zero-downtime deployments

## Security Considerations

### Backend Security
- Input validation via Pydantic
- SQL injection prevention via ORM
- CORS configuration for frontend domains
- Environment variable protection

### Frontend Security
- XSS prevention via React
- API URL configuration
- No sensitive data in client code
- HTTPS enforcement in production

## Performance Optimizations

### Backend
- Database indexes on frequently queried fields
- Efficient SQL queries via SQLAlchemy
- Minimal response payloads
- Connection pooling

### Frontend
- React's built-in optimizations
- Minimal bundle size
- Efficient re-rendering
- Lazy loading potential

## Monitoring and Logging

### Backend
- Health check endpoint
- Error logging
- Request/response logging
- Database connection monitoring

### Frontend
- Error boundaries (can be added)
- User feedback via toasts
- Loading states
- Network error handling

## Scalability Considerations

### Current Limitations
- Single database instance
- No caching layer
- No load balancing
- Limited concurrent users

### Future Improvements
- Database read replicas
- Redis caching
- Load balancer setup
- Microservices architecture
- Message queues for async processing

## Testing Strategy

### Backend Testing
- Unit tests for business logic
- Integration tests for API endpoints
- Database migration testing
- Performance testing

### Frontend Testing
- Component unit tests
- Integration tests
- E2E testing with Cypress
- Accessibility testing

### Manual Testing
- Cross-browser compatibility
- Mobile responsiveness
- User workflow testing
- Error scenario testing