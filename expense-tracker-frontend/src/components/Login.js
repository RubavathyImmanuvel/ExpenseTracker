import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
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

      if(role === 'USER'){
        const response = await axios.post(`http://localhost:8080/auth/login?userName=${email}&password=${password}`);
  
        // Check if response is only a string (the token itself)
        if (typeof response.data === 'string') {
          localStorage.setItem('token', response.data); // Store token
          console.log("Token received:", response.data);
          if(response.data !== 'User doesn\'t exist' && response.data !== 'Invalid credentials'){
            alert('Login successful!');
            navigate('/dashboard'); // Redirect to dashboard
          }
          else{
            alert('User doesn\'t exist or invalid credentials. Try again!')
          }
        
        } else {
          alert("Unexpected login response: " + JSON.stringify(response.data));
        }
      }
      else{
        alert('Access is denied')
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert('Login failed! Check console for details.');
    }
  };
  
  

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" className="form-control mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="form-control mb-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
