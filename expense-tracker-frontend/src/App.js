import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import MonthlyReport from './components/MonthlyReport';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';
import Register from './components/Register';
import MonthlyExpense from './components/MonthlyExpense';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/report" element={<MonthlyReport />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/total-monthly-expense" element={<MonthlyExpense />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
