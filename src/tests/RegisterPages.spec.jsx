import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPages from '../pages/RegisterPages.jsx';

describe('RegisterPages', () => {
  it('Muestra error cuando el nombre está vacío al perder el foco', () => {
    render(
      <MemoryRouter>
        <RegisterPages />
      </MemoryRouter>
    );

    const nombreInput = screen.getByLabelText(/Nombre completo/i);
    fireEvent.blur(nombreInput);

    expect(screen.getByText('Por favor ingrese su nombre completo')).toBeInTheDocument();
  });

  it('Reemplaza el error por email inválido después de corregir el nombre', () => {
    render(
      <MemoryRouter>
        <RegisterPages />
      </MemoryRouter>
    );

    const nombreInput = screen.getByLabelText(/Nombre completo/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);

    // Provoca error de nombre vacío
    fireEvent.blur(nombreInput);
    expect(screen.getByText('Por favor ingrese su nombre completo')).toBeInTheDocument();

    // Corrige nombre y provoca email inválido
    fireEvent.change(nombreInput, { target: { value: 'Barbara Arancibia' } });
    fireEvent.change(emailInput, { target: { value: 'correito' } });
    fireEvent.blur(emailInput);

    expect(screen.getByText('Por favor ingrese un correo electrónico válido')).toBeInTheDocument();
  });

  it('Muestra error si la edad es menor a 13 años', () => {
    render(
      <MemoryRouter>
        <RegisterPages />
      </MemoryRouter>
    );

    const fechaInput = screen.getByLabelText(/Fecha de nacimiento/i);

    // Fecha claramente menor a 13 años
    fireEvent.change(fechaInput, { target: { value: '2020-01-01' } });
    fireEvent.blur(fechaInput);

    expect(screen.getByText('Debes tener al menos 13 años para registrarte')).toBeInTheDocument();
  });

  it('Muestra error si la contraseña no cumple los requisitos', () => {
    render(
      <MemoryRouter>
        <RegisterPages />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/^Contraseña$/i);

    fireEvent.change(passwordInput, { target: { value: 'abc' } });
    fireEvent.blur(passwordInput);

    expect(
      screen.getByText('La contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo')
    ).toBeInTheDocument();
  });

  it('Muestra error si la confirmación de contraseña está vacía', () => {
    render(
      <MemoryRouter>
        <RegisterPages />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/^Contraseña$/i);
    const password2Input = screen.getByLabelText(/Confirmar contraseña/i);

    fireEvent.change(passwordInput, { target: { value: '12345678!' } });
    fireEvent.blur(password2Input);

    expect(screen.getByText('Por favor confirme su contraseña')).toBeInTheDocument();
  });

  it('Muestra error si las contraseñas no coinciden', () => {
    render(
      <MemoryRouter>
        <RegisterPages />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/^Contraseña$/i);
    const password2Input = screen.getByLabelText(/Confirmar contraseña/i);

    fireEvent.change(passwordInput, { target: { value: '12345678!' } });
    fireEvent.change(password2Input, { target: { value: 'hola' } });
    fireEvent.blur(password2Input);

    expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument();
  });

  it('Muestra mensaje de éxito y limpia los campos tras registro válido', () => {
    render(
      <MemoryRouter>
        <RegisterPages />
      </MemoryRouter>
    );

    const nombreInput = screen.getByLabelText(/Nombre completo/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const fechaInput = screen.getByLabelText(/Fecha de nacimiento/i);
    const passwordInput = screen.getByLabelText(/^Contraseña$/i);
    const password2Input = screen.getByLabelText(/Confirmar contraseña/i);

    fireEvent.change(nombreInput, { target: { value: 'Barbara Arancibia' } });
    fireEvent.change(emailInput, { target: { value: 'barbarita@gmail.com' } });
    fireEvent.change(fechaInput, { target: { value: '1999-12-08' } });
    fireEvent.change(passwordInput, { target: { value: '12345678!' } });
    fireEvent.change(password2Input, { target: { value: '12345678!' } });

    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    expect(screen.getByText('¡Registro exitoso! Ya puedes iniciar sesión')).toBeInTheDocument();

    // Campos vaciados
    expect(nombreInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(fechaInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(password2Input).toHaveValue('');
  });

  it('Verifica que el botón de registro existe y es de tipo submit', () => {
    render(
      <MemoryRouter>
        <RegisterPages />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /Registrarse/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

});