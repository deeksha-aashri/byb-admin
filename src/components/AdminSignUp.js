import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/register', {
        email,
        password,
      });
      console.log(response.data.message);
      localStorage.setItem('adminToken', response.data.token);

      // Redirect to books page after successful login
      navigate('/books');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSignUp} style={{ 
        width: '40vw', 
        height:'50vh',
        minWidth: '300px', // Ensures a minimum width on smaller screens
        margin: '50px auto', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '10px', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
      }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Sign Up</h2>

      <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ 
          width: '100%', 
          padding: '10px', 
          marginBottom: '20px', 
          borderRadius: '5px', 
          border: '1px solid #ccc' 
        }}
      />

      <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ 
          width: '100%', 
          padding: '10px', 
          marginBottom: '20px', 
          borderRadius: '5px', 
          border: '1px solid #ccc' 
        }}
      />

      <button 
        type="submit" 
        style={{ 
          width: '100%', 
          padding: '10px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          fontWeight: 'bold', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer' 
        }}
      >
        Sign Up
      </button>
    </form>
  );
};

export default AdminSignUp;
