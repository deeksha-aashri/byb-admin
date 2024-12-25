import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2'
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });
      console.log("09090", response);
      // Store the token in localStorage
      localStorage.setItem('adminToken', response.data.token);
      new swal('Login successful!')
      // Redirect to books page after successful login

      navigate('/books');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f4f8',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '50%', // Set width to 50%
        maxWidth: '400px', // Optional max width
        textAlign: 'center',
      }}>
        <h2 style={{
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
        }}>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              placeholder='test@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>
          {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
          <button type="submit" style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '16px',
          }}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
