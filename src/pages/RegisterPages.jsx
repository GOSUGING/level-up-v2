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
  const [success, setSuccess] = useState('');
  const [touched, setTouched] = useState({
    nombre: false,
    email: false,
    fechaNacimiento: false,
    password: false,
    password2: false
  });

  // Establecer la fecha máxima (hoy)
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fechaNacimiento').setAttribute('max', today);
  }, []);

  // Efecto para validar en tiempo real cuando cambian los datos
  useEffect(() => {
    if (Object.values(touched).some(field => field)) {
      validateForm();
    }
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });
  };

  // Validar formato de correo electrónico
  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  // Validar fuerza de contraseña
  const validatePassword = (password) => {
    // Mínimo 8 caracteres, al menos un número y un símbolo
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  // Validar edad mínima (13 años)
  const validateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age >= 13;
  };

  const validateForm = () => {
    setError('');
    setSuccess('');
    
    // Validaciones por campo
    if (touched.nombre && !formData.nombre) {
      setError('Por favor ingrese su nombre completo');
      return false;
    }
    
    if (touched.email && !formData.email) {
      setError('Por favor ingrese su correo electrónico');
      return false;
    }
    
    if (touched.email && formData.email && !validateEmail(formData.email)) {
      setError('Por favor ingrese un correo electrónico válido');
      return false;
    }
    
    if (touched.fechaNacimiento && !formData.fechaNacimiento) {
      setError('Por favor ingrese su fecha de nacimiento');
      return false;
    }
    
    if (touched.fechaNacimiento && formData.fechaNacimiento && !validateAge(formData.fechaNacimiento)) {
      setError('Debes tener al menos 13 años para registrarte');
      return false;
    }
    
    if (touched.password && !formData.password) {
      setError('Por favor ingrese una contraseña');
      return false;
    }
    
    if (touched.password && formData.password && !validatePassword(formData.password)) {
      setError('La contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo');
      return false;
    }
    
    if (touched.password2 && !formData.password2) {
      setError('Por favor confirme su contraseña');
      return false;
    }
    
    if (touched.password2 && formData.password2 && formData.password !== formData.password2) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    setTouched({
      nombre: true,
      email: true,
      fechaNacimiento: true,
      password: true,
      password2: true
    });
    
    if (validateForm()) {
      // Aquí iría la lógica de registro
      console.log('Registrando usuario:', formData);
      setSuccess('¡Registro exitoso! Ya puedes iniciar sesión');
      
      // Mantener el mensaje de éxito y limpiar el formulario
      setFormData({
        nombre: '',
        email: '',
        fechaNacimiento: '',
        password: '',
        password2: ''
      });
      
      // Resetear los campos tocados
      setTouched({
        nombre: false,
        email: false,
        fechaNacimiento: false,
        password: false,
        password2: false
      });
      
      // No limpiar el mensaje de éxito automáticamente
    }
  };

  return (
    <Container className="main-container">
      <div className="form-container">
        <h2>Formulario de Registro</h2>
        
        {error && <Alert variant="danger" id="errorMsg">{error}</Alert>}
        {success && <Alert variant="success" id="successMsg">{success}</Alert>}
        
        <Form id="registroForm" onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">Nombre completo</Form.Label>
            <Form.Control
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              onBlur={() => handleBlur('nombre')}
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
              onBlur={() => handleBlur('email')}
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
              onBlur={() => handleBlur('fechaNacimiento')}
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
              onBlur={() => handleBlur('password')}
              required
            />
            <Form.Text className="text-light">
              La contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password2">Confirmar contraseña</Form.Label>
            <Form.Control
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              onBlur={() => handleBlur('password2')}
              required
            />
          </Form.Group>

          <Button type="submit" className="btn-register w-100">
            Registrarse
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default RegisterPages;