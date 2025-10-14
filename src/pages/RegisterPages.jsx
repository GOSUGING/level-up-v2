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
    <> <h1>Register</h1> </>
  )
}

export default RegisterPages