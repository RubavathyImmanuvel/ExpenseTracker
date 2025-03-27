import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/register', {
        name,
        email,
        password,
        role: 'USER'  // Default role for normal users
      });

      alert('Registration successful! You can now log in.');
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Registration failed! Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>User Registration</h2>
      <form onSubmit={handleRegister}>
        <input type="text" className="form-control mb-2" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" className="form-control mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-success">Register</button>
      </form>
    </div>
  );
};

export default Register;
