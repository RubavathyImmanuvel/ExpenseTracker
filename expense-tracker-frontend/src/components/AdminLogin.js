import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.clear();
    try {
      const roleResponse = await axios.get('http://localhost:8080/auth/role', {
        params: { userName: email, password: password } // Correctly passing parameters
      });
      const role = roleResponse.data;
      console.log("User Role:", role);

      if(role === 'ADMIN'){
        const response = await axios.post(`http://localhost:8080/auth/login?userName=${email}&password=${password}`);

        if (response.data !== 'User doesn\'t exist' && response.data !== 'Invalid credentials') {
          localStorage.setItem('token', response.data);
          localStorage.setItem('role', 'ADMIN');
          navigate('/admin');
        } else {
          alert("Invalid login response: " + JSON.stringify(response.data));
          navigate('/admin-register');
        }
      }
      else{
        alert('Access denied!')
      }
    } catch (error) {
      alert('Admin login failed! Please check your credentials.');
      navigate('/admin-register');
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" className="form-control mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="form-control mb-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-danger">Login as Admin</button>
      </form>
    </div>
  );
};

export default AdminLogin;
