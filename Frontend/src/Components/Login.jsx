// src/pages/Login.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const navigate = useNavigate(); // For redirecting
    
    const SECRET_KEY = 'my-secret-key';

    function encryptString(plainText) {
        const encrypted = CryptoJS.AES.encrypt(plainText, SECRET_KEY).toString();
        return encrypted;
    }

  const handleSubmit = async(e) => {
    e.preventDefault();
    // TODO: Add your login logic here (API call, auth, etc.)
      // console.log('Logging in with', email, password);
      let formData = {email, password}
      let data = encryptString(JSON.stringify(formData))
      try {
        const res = await axios.post('http://localhost:8080/user/login', {data});
    
          console.log('Signup successful:', res.data);
          localStorage.setItem("token",res.data.token)
          alert("user successfully logged in")
          navigate("/dashboard")
      } catch (err) {
          console.error('Signup error:', err.response?.data || err.message);
          alert(err.message)
      }
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="container mt-5 border rounded p-4 shadow" style={{ maxWidth: '400px',border:"1px solid #151515", padding:"30px" }}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>

        <p className="text-center mt-3">
          Don't have an account?{' '}
          <button onClick={goToSignup} className="btn btn-link p-0">
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
