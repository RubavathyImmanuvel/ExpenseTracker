import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  console.log("token " + token)
  console.log("role " + role)
  useEffect(() => {
    if (token != null && token != 'Invalid credentials' && token !== 'User doesn\'t exist') {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
    }}, [token]);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand">Expense Tracker</div>
        <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {token && role === "ADMIN" ? (
            <li className="nav-item"><Link to="/admin" className="nav-link">Admin Panel</Link></li>
          ) : token ? ( 
            <>
              <li className="nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
              <li className="nav-item"><Link to="/add-expense" className="nav-link">Add Expense</Link></li>
              <li className="nav-item"><Link to="/report" className="nav-link">Monthly Report</Link></li>
              <li className="nav-item"><Link to="/total-monthly-expense" className="nav-link">Total Monthly Expense</Link></li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link to="/" className="nav-link">Login</Link></li>
              <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
            </>
          )}
          {token && <li className="nav-item"><button className="btn btn-danger" onClick={logout}>Logout</button></li>}
        </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
