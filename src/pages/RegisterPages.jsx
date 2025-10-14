import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

function RegisterPages() {

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    fechaNacimiento: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');

  // Establecer la fecha máxima (hoy)
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fechaNacimiento').setAttribute('max', today);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.nombre || !formData.email || !formData.fechaNacimiento || !formData.password || !formData.password2) {
      setError('Por favor complete todos los campos');
      return;
    }
    
    if (formData.password !== formData.password2) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    // Aquí iría la lógica de registro
    console.log('Registrando usuario:', formData);
    setError('');
  };

  return (
    <Container className="main-container">
      <div className="form-container">
        <h2>Formulario de Registro</h2>
        
        {error && <Alert variant="danger" id="errorMsg">{error}</Alert>}
        
        <Form id="registroForm" onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">Nombre completo</Form.Label>
            <Form.Control
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="fechaNacimiento">Fecha de nacimiento</Form.Label>
            <Form.Control
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Contraseña</Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password2">Confirmar contraseña</Form.Label>
            <Form.Control
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" className="btn-register w-100">
            Registrarse
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export default RegisterPages