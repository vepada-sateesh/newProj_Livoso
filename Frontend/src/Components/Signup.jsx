// src/pages/Signup.jsx
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios'



function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    role: '',
  });

    const [error, setError] = useState('');
    

    const SECRET_KEY = 'my-secret-key';

function encryptString(plainText) {
  const encrypted = CryptoJS.AES.encrypt(plainText, SECRET_KEY).toString();
  return encrypted;
}

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const { email, password, confirmPassword, age, role } = formData;

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    console.log('Signup data:', formData);

      // TODO: Call your signup API 
      let data = encryptString(JSON.stringify(formData))
      try {
        const res = await axios.post('http://localhost:8080/user/Signup', {data});
    
          console.log('Signup successful:', res.data);
          alert("user successfully created")
      } catch (err) {
          console.error('Signup error:', err.response?.data || err.message);
          alert(err.message)
      }
      
  };

  return (
    <div className="container mt-5 border border-2 rounded p-4 shadow" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Signup</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            required
            min="1"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-4">
          <label>Role</label>
          <select
            className="form-select"
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
