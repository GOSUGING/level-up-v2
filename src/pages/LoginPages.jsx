import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

function LoginPages() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticación
    console.log('Iniciando sesión con:', { email, password });
    // Por ahora solo validamos que los campos no estén vacíos
    if (!email || !password) {
      setError('Por favor complete todos los campos');
      return;
    }
    // Resetear error si todo está bien
    setError('');
  };

  return (
    
  )
}

export default LoginPages