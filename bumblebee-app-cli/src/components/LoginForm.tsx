import React, { useState } from 'react';
import { Button, TextField, Container } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';
import './LoginForm.css'; 

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  // State for username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send POST request to backend to authenticate user
      const response = await axiosInstance.post('/api/login', {
        username,
        password,
      });

      // If authentication is successful, trigger onLogin callback
      if (response.data.authenticated) {
        onLogin();
      }
    } catch (error) {
      // Handle login errors
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage('Hibás felhasználónév vagy jelszó!');
      } else {
        console.error('Hiba a rendelés során, szerver nem elérhető:', error);
        alert('Váratlan hiba történt! Úgy tűnik a szerver nem elérhető.');
      } 
    }
  };

  return (
    <Container className="login-container">
      {/* Login form */}
      <form onSubmit={handleLogin} className="login-form">
        <TextField
          label="Felhasználónév"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          className="input-field"
        />
        <TextField
          label="Jelszó"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          className="input-field"
        />
        <Button type="submit" variant="contained" color="primary" className="submit-btn">Belépés</Button>

        {/* Show error message if login fails */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </Container>
  );
};

export default LoginForm;
