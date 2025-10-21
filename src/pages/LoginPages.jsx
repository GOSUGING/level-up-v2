import React, { useState, useContext } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';

function LoginPages() {
  const { login } = useContext(AuthContext); // <-- usamos el contexto
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    // validaciones simples
    if (!email || !password) {
      setError('Por favor complete todos los campos');
      return;
    }
    if (!validateEmail(email)) {
      setError('Por favor ingrese un correo electrónico válido');
      return;
    }

    setLoading(true);
    try {
      // Llamamos al login del contexto (puede ser async si haces llamada a backend)
      await login({ email, password });
      // Si login OK, redirigimos al perfil
      navigate('/perfil');
    } catch (err) {
      // Mostrar mensaje recibido o uno genérico
      setError(err?.message || 'Error al iniciar sesión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="inputPassword">Contraseña</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <div className="botones">
            <Button className="btn-login" type="submit" disabled={loading} >
              {loading ? 'Entrando...' : 'Iniciar Sesión'}
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

export default LoginPages;
