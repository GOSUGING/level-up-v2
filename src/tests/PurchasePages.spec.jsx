import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PurchasePages from '../pages/PurchasePages.jsx';
import { CartContext } from '../context/CartContext.jsx';

// Helper para renderizar con Router y contexto opcional
function renderWithProviders(ui, { cartItems = [] } = {}) {
  return render(
    <BrowserRouter>
      <CartContext.Provider value={{ cartItems }}>
        {ui}
      </CartContext.Provider>
    </BrowserRouter>
  );
}

describe('Componentes PurchasePages', () => {
  it('Renderiza los títulos principales', () => {
    renderWithProviders(<PurchasePages />);

    expect(screen.getByText('Resumen de Compra')).toBeInTheDocument();
    expect(screen.getByText('Tu Carrito')).toBeInTheDocument();
    expect(screen.getByText('Datos de la Tarjeta')).toBeInTheDocument();
  });

  it('Renderiza los textfields y permite escribir', () => {
    renderWithProviders(<PurchasePages />);

    const nombreInput = screen.getByLabelText(/Nombre del titular/i);
    const numeroInput = screen.getByLabelText(/Número de tarjeta/i);
    const fechaInput = screen.getByLabelText(/Fecha de vencimiento \(MM\/YY\)/i);
    const cvvInput = screen.getByLabelText(/^CVV/i);

    expect(nombreInput).toBeInTheDocument();
    expect(numeroInput).toBeInTheDocument();
    expect(fechaInput).toBeInTheDocument();
    expect(cvvInput).toBeInTheDocument();

    fireEvent.change(nombreInput, { target: { value: 'Bari' } });
    expect(nombreInput.value).toBe('Bari');

    // El número se formatea en grupos de 4
    fireEvent.change(numeroInput, { target: { value: '1111222233334444' } });
    expect(numeroInput.value).toBe('1111 2222 3333 4444');

    fireEvent.change(fechaInput, { target: { value: '12/30' } });
    expect(fechaInput.value).toBe('12/30');

    fireEvent.change(cvvInput, { target: { value: '123' } });
    expect(cvvInput.value).toBe('123');
  });

  it('Renderiza el botón "Pagar" y está deshabilitado con carrito vacío', () => {
    renderWithProviders(<PurchasePages />, { cartItems: [] });

    const payButton = screen.getByRole('button', { name: /Pagar/i });
    expect(payButton).toBeInTheDocument();
    expect(payButton).toBeDisabled();

    // Mensaje informativo cuando no hay productos
    expect(screen.getByText(/Agrega productos al carrito para poder pagar/i)).toBeInTheDocument();
  });

  it('Muestra mensajes de validación cuando los datos son inválidos', () => {
    // Agregar un item en el carrito para habilitar el botón
    const mockCart = [{ id: 1, name: 'Producto Test', price: 10000 }];
    renderWithProviders(<PurchasePages />, { cartItems: mockCart });

    const payButton = screen.getByRole('button', { name: /Pagar/i });

    // No ingresamos número de tarjeta
    fireEvent.click(payButton);

    expect(
      screen.getByText('Por favor ingrese el número de tarjeta.')
    ).toBeInTheDocument();
  });

  it('Valida que el número de tarjeta sea exactamente de 16 dígitos', () => {
    const mockCart = [{ id: 2, name: 'Otro Producto', price: 20000 }];
    renderWithProviders(<PurchasePages />, { cartItems: mockCart });

    const nombreInput = screen.getByLabelText(/Nombre del titular/i);
    const numeroInput = screen.getByLabelText(/Número de tarjeta/i);
    const fechaInput = screen.getByLabelText(/Fecha de vencimiento \(MM\/YY\)/i);
    const cvvInput = screen.getByLabelText(/^CVV/i);
    const payButton = screen.getByRole('button', { name: /Pagar/i });

    fireEvent.change(nombreInput, { target: { value: 'Barbara Asalgado' } });
    fireEvent.change(numeroInput, { target: { value: '123456789012345' } }); // 15 dígitos
    fireEvent.change(fechaInput, { target: { value: '12/30' } });
    fireEvent.change(cvvInput, { target: { value: '123' } });

    fireEvent.click(payButton);

    expect(
      screen.getByText('El número de tarjeta debe tener 16 dígitos.')
    ).toBeInTheDocument();
  });
});