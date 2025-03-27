import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('ADMIN')
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8080/auth/register', {
            name,
            email,
            password,
            role: 'ADMIN'  // Default role for normal users
          });

      alert(response.data);
      navigate('/admin-login'); // Redirect to login page after successful registration
    } catch (error) {
      alert(error.response || "Admin registration failed!");
    }
  };

  return (
    <div className="container">
      <h2>Admin Registration</h2>
      <form onSubmit={handleRegister}>
        <input type="email" className="form-control mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="form-control mb-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-danger">Register Admin</button>
      </form>
    </div>
  );
};

export default AdminRegister;
