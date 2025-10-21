// Importaciones necesarias para testear React
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import CategoriesPages from '../src/pages/CategoriesPages'

// ✅ Mock de useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => (path) => {
      global.__vNavigateCalls = global.__vNavigateCalls || []
      global.__vNavigateCalls.push(path)
    },
  }
})

describe('Pruebas de CategoriesPages', () => {
  beforeEach(() => {
    global.__vNavigateCalls = []
  })

  it('Debe renderizar el título principal de categorías', () => {
    render(
      <MemoryRouter>
        <CategoriesPages />
      </MemoryRouter>
    )

    expect(screen.getByText(/Categorías/i)).toBeInTheDocument()
  })

  it('Debe mostrar al menos una categoría disponible', async () => {
    render(
      <MemoryRouter>
        <CategoriesPages />
      </MemoryRouter>
    )

    const categoria = await screen.findByText(/Gamer/i)
    expect(categoria).toBeInTheDocument()
  })

  it('Debe navegar a la página de productos al hacer clic en una categoría', async () => {
    render(
      <MemoryRouter>
        <CategoriesPages />
      </MemoryRouter>
    )

    const categoriaBtn = await screen.findByRole('button', { name: /ver productos/i })
    await userEvent.click(categoriaBtn)

    expect(global.__vNavigateCalls.some((path) => path.includes('/productos'))).toBe(true)
  })
})
