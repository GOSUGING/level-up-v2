// src/tests/LoginPages.spec.jsx
import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithAuthRouter } from './utils/RenderWithAuthRouter.jsx'
import LoginPages from '../pages/LoginPages.jsx'
import { vi } from 'vitest'

// Mockeamos useNavigate para verificar navegación a /profile
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => (path) => {
      global.__navCalls = global.__navCalls || []
      global.__navCalls.push(path)
    },
  }
})

describe('LoginPages', () => {
  beforeEach(() => {
    global.__navCalls = []
    // limpiar localStorage entre pruebas por si AuthContext persiste usuario
    localStorage.clear()
  })

  it('valida email y navega al profile en login exitoso', async () => {
    renderWithAuthRouter(<LoginPages />)

    const user = userEvent.setup()
    const email = screen.getByLabelText(/email/i)
    const pass = screen.getByLabelText(/contraseña/i)
    const submit = screen.getByRole('button', { name: /iniciar sesión/i })

    await user.type(email, 'user@test.com')
    await user.type(pass, '123456')
    await user.click(submit)

    // Se llamó a navigate('/profile')
    expect(global.__navCalls).toContain('/profile')
    // y no hay alertas de error visibles
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('renderiza el formulario CONTRASEÑA correctamente y permite escribir', async () => {
    renderWithAuthRouter(<LoginPages />)

    const user = userEvent.setup()
    const passwordInput = screen.getByLabelText(/contraseña/i)

    // es input de tipo password y está habilitado
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(passwordInput).not.toBeDisabled()

    await user.type(passwordInput, 'secreta123')
    expect(passwordInput).toHaveValue('secreta123')
  })

  it('Renderiza el botón "Iniciar Sesión" y permite usar los textfields antes de hacer click', async () => {
    renderWithAuthRouter(<LoginPages />)

    const user = userEvent.setup()
    const email = screen.getByLabelText(/email/i)
    const pass = screen.getByLabelText(/contraseña/i)
    const submit = screen.getByRole('button', { name: /iniciar sesión/i })

    // inputs habilitados y botón habilitado
    expect(email).not.toBeDisabled()
    expect(pass).not.toBeDisabled()
    expect(submit).toBeEnabled()

    await user.type(email, 'user@test.com')
    await user.type(pass, 'abc123')
    expect(email).toHaveValue('user@test.com')
    expect(pass).toHaveValue('abc123')
  })

  it('Renderiza el texto direccional "Registrarse"', () => {
    renderWithAuthRouter(<LoginPages />)

    // texto visible
    expect(screen.getByText(/Regístrate/i)).toBeInTheDocument()

    // y el link apunta a /registro
    const link = screen.getByRole('link', { name: /regístrate/i })
    expect(link.getAttribute('href')).toBe('/registro')
  })
})
