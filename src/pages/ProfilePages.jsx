// src/pages/ProfilePage.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import '../Profilepage.css';

export default function ProfilePage() {
    const { user, updateProfile, logout } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    const [promos, setPromos] = useState(false);
    const [success, setSuccess] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setAddress(user.address || '');
            setPhone(user.phone || '');
            setNewsletter(!!user.preferences?.newsletter);
            setPromos(!!user.preferences?.promos);
        }
    }, [user]);

    const validate = () => {
        const e = {};
        if (!name || name.trim().length < 2) e.name = 'Nombre muy corto';
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email inválido';
        return e;
    };

    const handleSave = (ev) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        setSuccess('');
        if (Object.keys(e).length > 0) return;

        updateProfile({
            name,
            email,
            address,
            phone,
            preferences: { newsletter, promos },
        });

        setSuccess('Perfil actualizado correctamente');
        setTimeout(() => setSuccess(''), 3500);
    };

    // Sin usuario → redirige a /login
    if (!user) return <Navigate to="/login" replace />;

    return (
        <div className="profile-page">
            <h2 className="title">Mi perfil</h2>
            <p className="subtitle">Actualiza tu información personal y preferencias de compra.</p>

            {success && <Alert variant="success">{success}</Alert>}

            <div className="profile-layout">
                {/* --- Formulario --- */}
                <div className="profile-form">
                    <Form onSubmit={handleSave}>
                        {/* Nombre */}
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="profileName">Nombre completo</Form.Label>
                            <Form.Control
                                id="profileName"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                isInvalid={!!errors.name}
                                aria-invalid={!!errors.name}         // 👈 añade esto
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Email */}
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="profileEmail">Email</Form.Label>
                            <Form.Control
                                id="profileEmail"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isInvalid={!!errors.email}
                                aria-invalid={!!errors.email}        // 👈 añade esto
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Dirección */}
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="profileAddress">Dirección</Form.Label>
                            <Form.Control
                                id="profileAddress"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>

                        {/* Teléfono */}
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="profilePhone">Teléfono</Form.Label>
                            <Form.Control
                                id="profilePhone"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>

                        <h5>Preferencias</h5>

                        {/* Checkboxes con id explícito para accesibilidad/testing */}
                        <Form.Group className="mb-2">
                            <Form.Check
                                id="pref-newsletter"
                                type="checkbox"
                                label="Recibir newsletter"
                                checked={newsletter}
                                onChange={(e) => setNewsletter(e.target.checked)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                                id="pref-promos"
                                type="checkbox"
                                label="Recibir promociones"
                                checked={promos}
                                onChange={(e) => setPromos(e.target.checked)}
                            />
                        </Form.Group>

                        <div className="d-flex gap-2">
                            <Button variant="primary" type="submit">Guardar cambios</Button>
                            <Button variant="outline-danger" onClick={logout}>Cerrar sesión</Button>
                        </div>
                    </Form>
                </div>

                {/* --- Resumen --- */}
                <div className="profile-summary">
                    <h5>Resumen</h5>
                    <p><strong>Nombre:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Dirección:</strong> {address || '—'}</p>
                    <p><strong>Teléfono:</strong> {phone || '—'}</p>
                    <p><strong>Newsletter:</strong> {newsletter ? 'Sí' : 'No'}</p>
                    <p><strong>Promos:</strong> {promos ? 'Sí' : 'No'}</p>
                </div>
            </div>
        </div>
    );
}
