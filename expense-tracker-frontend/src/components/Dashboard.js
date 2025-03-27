import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('email'); // Assuming email is stored in localStorage

  const fetchAllExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/expense/list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      alert('Failed to load expenses.');
    }
  };

  useEffect(() => {
    fetchAllExpenses();
  }, []); // Fetch data when the component loads

  return (
    <div className="container">
      <h2>Your Expense Dashboard</h2>

      {/* Expenses Table */}
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
        <p>No expenses found. Start adding your expenses!</p>
      )}
    </div>
  );
};

export default Dashboard;
