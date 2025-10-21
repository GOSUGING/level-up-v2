import React, { useState, useContext, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';

function LoginPages() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Si ya hay sesión, redirige a /perfil
  useEffect(() => {
    if (user) navigate('/perfil');
  }, [user, navigate]);

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

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
      await login({ email, password });
      navigate('/perfil');
    } catch (err) {
      setError(err?.message || 'Error al iniciar sesión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="main-container">
      <div className="form-container">
        {error && <Alert variant="danger">{error}</Alert>}

        {/* 👇 evita que el navegador bloquee el submit */}
        <Form onSubmit={handleLogin} noValidate>
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
            <Button className="btn-login" type="submit" disabled={loading}>
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
  );
}

export default LoginPages;
