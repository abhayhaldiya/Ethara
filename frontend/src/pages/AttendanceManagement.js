import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { employeeAPI, attendanceAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const AttendanceManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    employee_id: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present'
  });
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [employeesResponse, attendanceResponse] = await Promise.all([
        employeeAPI.getAll(),
        attendanceAPI.getAll()
      ]);
      setEmployees(employeesResponse.data);
      setAttendance(attendanceResponse.data);
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error('Fetch data error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.employee_id || !formData.date || !formData.status) {
      toast.error('All fields are required');
      return;
    }

    try {
      setSubmitting(true);
      await attendanceAPI.mark(formData);
      toast.success('Attendance marked successfully');
      setFormData({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present'
      });
      setShowForm(false);
      fetchData();
    } catch (error) {
      if (error.response?.data?.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error('Failed to mark attendance');
      }
      console.error('Mark attendance error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp.employee_id === employeeId);
    return employee ? employee.full_name : employeeId;
  };

  const filteredAttendance = selectedEmployee 
    ? attendance.filter(record => record.employee_id === selectedEmployee)
    : attendance;

  if (loading) return <LoadingSpinner message="Loading attendance data..." />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: '600' }}>Attendance Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Mark Attendance'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            Mark Attendance
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3">
              <div className="form-group">
                <label className="form-label">Employee</label>
                <select
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.employee_id}>
                      {employee.employee_id} - {employee.full_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Marking...' : 'Mark Attendance'}
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
            Attendance Records ({filteredAttendance.length})
          </h3>
          <div className="form-group" style={{ margin: 0, minWidth: '200px' }}>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="form-select"
            >
              <option value="">All Employees</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.employee_id}>
                  {employee.employee_id} - {employee.full_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {filteredAttendance.length === 0 ? (
          <div className="empty-state">
            <h3>No attendance records found</h3>
            <p>Mark attendance for employees to see records here</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((record) => (
                <tr key={record.id}>
                  <td>{record.employee_id}</td>
                  <td>{getEmployeeName(record.employee_id)}</td>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      backgroundColor: record.status === 'Present' ? '#dcfce7' : '#fee2e2',
                      color: record.status === 'Present' ? '#16a34a' : '#dc2626'
                    }}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;