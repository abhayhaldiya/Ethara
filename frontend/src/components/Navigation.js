import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="container">
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/employees" 
              className={`nav-link ${location.pathname === '/employees' ? 'active' : ''}`}
            >
              Employee Management
            </Link>
          </li>
          <li>
            <Link 
              to="/attendance" 
              className={`nav-link ${location.pathname === '/attendance' ? 'active' : ''}`}
            >
              Attendance Management
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;