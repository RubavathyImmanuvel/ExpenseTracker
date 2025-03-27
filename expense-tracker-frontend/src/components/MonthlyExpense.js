import React, { useState } from 'react';
import axios from 'axios';

const MonthlyExpense = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [totalExpense, setTotalExpense] = useState(null);
  const token = localStorage.getItem('token');

  const fetchTotalExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/expense/total-monthly-expense`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { year, month }
      });
      setTotalExpense(response.data);
    } catch (error) {
      console.error('Error fetching total monthly expense:', error);
      alert('Failed to fetch total expense. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Total Monthly Expense</h2>
      <form onSubmit={fetchTotalExpense} className="mb-3">
        <div className="mb-2">
          <label className="form-label">Year</label>
          <input type="number" className="form-control" value={year} onChange={(e) => setYear(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label className="form-label">Month</label>
          <input type="number" className="form-control" value={month} min="1" max="12" onChange={(e) => setMonth(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Get Total Expense</button>
      </form>

      {totalExpense !== null && (
        <div className="alert alert-info">
          <h4>Total Expense for {year}-{month}: ₹{totalExpense}</h4>
        </div>
      )}
    </div>
  );
};

export default MonthlyExpense;
