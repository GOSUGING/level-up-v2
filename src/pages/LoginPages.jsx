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
    <Container className="main-container">
      <div className="form-container">
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="inputEmail">Email</Form.Label>
            <Form.Control
              type="email"
              id="inputEmail"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="inputPassword">Password</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="botones">
            <Link to="/registro">
              <Button className="btn-register" type="button">
                Registrarse
              </Button>
            </Link>
            <Button className="btn-login" type="submit">
              Iniciar Sesión
            </Button>
          </div>

          <div className="text-center mt-3">
            <p className="register-link">
              ¿No tienes una cuenta? <Link to="/registro">¡Regístrate!</Link>
            </p>
          </div>
          
        </Form>
      </div>
    </Container>
  )
}

export default LoginPages