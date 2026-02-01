import React, { useState, useEffect } from 'react';
import { employeeAPI, attendanceAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [employeesResponse, attendanceResponse] = await Promise.all([
        employeeAPI.getAll(),
        attendanceAPI.getAll()
      ]);

      const employees = employeesResponse.data;
      const attendance = attendanceResponse.data;

      // Get today's date
      const today = new Date().toISOString().split('T')[0];
      const todayAttendance = attendance.filter(record => record.date === today);

      setStats({
        totalEmployees: employees.length,
        presentToday: todayAttendance.filter(record => record.status === 'Present').length,
        absentToday: todayAttendance.filter(record => record.status === 'Absent').length
      });
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;

  return (
    <div>
      <h2 style={{ marginBottom: '2rem', fontSize: '1.875rem', fontWeight: '600' }}>
        Dashboard
      </h2>

      {error && <div className="error">{error}</div>}

      <div className="grid grid-cols-3">
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
            Total Employees
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: '#667eea' }}>
            {stats.totalEmployees}
          </p>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
            Present Today
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: '#16a34a' }}>
            {stats.presentToday}
          </p>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
            Absent Today
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: '#ef4444' }}>
            {stats.absentToday}
          </p>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
          Quick Actions
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/employees" className="btn btn-primary">
            Manage Employees
          </a>
          <a href="/attendance" className="btn btn-secondary">
            Mark Attendance
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;