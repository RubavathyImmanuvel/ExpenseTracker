import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MonthlyReport = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem('token');

  const fetchMonthlyReport = async () => {
    try {
      const response = await axios.get('http://localhost:8080/expense/monthly-report', {
        headers: { Authorization: `Bearer ${token}` },
        params: { year, month }
      });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
      alert('Failed to fetch the monthly report.');
    }
  };

  useEffect(() => {
    fetchMonthlyReport();
  }, []); // Fetch data when the component loads

  return (
    <div className="container">
      <h2>Monthly Expense Report</h2>

      {/* Year & Month Selection */}
      <div className="mb-3 d-flex">
        <input type="number" className="form-control me-2" value={year} onChange={(e) => setYear(e.target.value)} required />
        <input type="number" className="form-control me-2" value={month} min="1" max="12" onChange={(e) => setMonth(e.target.value)} required />
        <button className="btn btn-primary" onClick={fetchMonthlyReport}>Get Report</button>
      </div>

      {/* Report Table */}
      {expenses.length > 0 ? (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.category}</td>
                <td>₹{expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No expenses found for the selected month.</p>
      )}
    </div>
  );
};

export default MonthlyReport;
