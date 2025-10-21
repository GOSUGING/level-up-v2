// Importaciones necesarias para testear React
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import ProductPages from '../src/pages/ProductPages'

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

describe('Pruebas de ProductPages', () => {
  beforeEach(() => {
    global.__vNavigateCalls = []
  })

  it('Debe renderizar el título principal de productos', () => {
    render(
      <MemoryRouter>
        <ProductPages />
      </MemoryRouter>
    )

    // Busca el título o texto principal del componente
    expect(screen.getByText(/Productos/i)).toBeInTheDocument()
  })

  it('Debe mostrar al menos un producto en pantalla', async () => {
    render(
      <MemoryRouter>
        <ProductPages />
      </MemoryRouter>
    )

    // Busca un producto visible (ajusta el texto si tu lista tiene otro formato)
    const producto = await screen.findByText(/Producto/i)
    expect(producto).toBeInTheDocument()
  })

  it('Debe navegar al detalle del producto al hacer clic en "Ver más"', async () => {
    render(
      <MemoryRouter>
        <ProductPages />
      </MemoryRouter>
    )

    // Simula el click en un botón o enlace "Ver más"
    const verMasBtn = await screen.findByRole('button', { name: /ver más/i })
    await userEvent.click(verMasBtn)

    // Verifica que la navegación fue llamada
    expect(global.__vNavigateCalls.some((path) => path.includes('/producto'))).toBe(true)
  })
})
