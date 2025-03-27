import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/auth/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to load users.');
    }
  };

  const deleteUser = async (userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        await axios.delete(`http://localhost:8080/auth/delete?userName=${userName}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert(`User ${userName} deleted successfully.`);
        fetchUsers(); // Refresh user list
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user.');
      }
    }
  };

  const deleteUserExpenses = async (userName) => {
    if (window.confirm(`Delete all expenses for ${userName}?`)) {
      try {
        await axios.delete(`http://localhost:8080/expense/delete?userName=${userName}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert(`Expenses for ${userName} deleted successfully.`);
      } catch (error) {
        console.error('Error deleting user expenses:', error);
        alert('Failed to delete user expenses.');
      }
    }
  };

  return (
    <div>
      <h2>Admin Panel - Manage Users</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-danger btn-sm me-2" onClick={() => deleteUser(user.email)}>Delete User</button>
                <button className="btn btn-warning btn-sm" onClick={() => deleteUserExpenses(user.email)}>Delete Expenses</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
