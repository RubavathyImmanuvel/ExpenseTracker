import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log("Retrieved Token:", storedToken);  // Debugging
    if (storedToken) {
      setToken(storedToken);
    } else {
      alert("No token found, please log in again.");
      navigate('/');
    }
  }, [navigate]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Error: No authentication token.");
      return;
    }

    try {
      await axios.post('http://localhost:8080/expense/add', 
        { category, amount },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      alert('Expense added successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to add expense.');
      console.error('Add Expense Error:', error);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleAddExpense}>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
