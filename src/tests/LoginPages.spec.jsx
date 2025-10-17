import { render, screen, fireEvent } from "@testing-library/react"; // Importa utilidades de testing
import { BrowserRouter } from "react-router-dom"; // Importa el enrutador para pruebas de componentes con rutas
import LoginPages from "../pages/LoginPages"; // Importa el componente a testear

describe("Componente Login", () => { // Agrupa los tests del componente Login

  it('renderiza el formulario EMAIL correctamente y permite escribir', () => { // Test para el input de Email
    render(
      <BrowserRouter>
        <LoginPages />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i); // Obtiene el input de Email
    expect(emailInput).toBeInTheDocument(); // Verifica que exista en el DOM

    fireEvent.change(emailInput, { target: { value: "usuario@test.com" } }); // Simula escritura
    expect(emailInput.value).toBe("usuario@test.com"); // Verifica que el valor se haya actualizado
  });

  it('renderiza el formulario CONTRASEÑA correctamente y permite escribir', () => { // Test para el input de Contraseña
    render(
      <BrowserRouter>
        <LoginPages />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText(/Contraseña/i); // Obtiene el input de Contraseña
    expect(passwordInput).toBeInTheDocument(); // Verifica que exista en el DOM

    fireEvent.change(passwordInput, { target: { value: "123456" } }); // Simula escritura
    expect(passwordInput.value).toBe("123456"); // Verifica que el valor se haya actualizado
  });

  it('Renderiza el botón "Iniciar Sesión" y permite usar los textfields antes de hacer clic', () => { // Test para el botón de login
    render(
      <BrowserRouter>
        <LoginPages />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i); // Obtiene el input de Email
    const passwordInput = screen.getByLabelText(/Contraseña/i); // Obtiene el input de Contraseña
    const loginButton = screen.getByRole("button", { name: /iniciar sesión/i }); // Obtiene el botón de login

    expect(emailInput).toBeInTheDocument(); // Verifica existencia de Email
    expect(passwordInput).toBeInTheDocument(); // Verifica existencia de Contraseña
    expect(loginButton).toBeInTheDocument(); // Verifica existencia del botón

    fireEvent.change(emailInput, { target: { value: "usuario@test.com" } }); // Simula escritura en Email
    fireEvent.change(passwordInput, { target: { value: "123456" } }); // Simula escritura en Contraseña

    expect(emailInput.value).toBe("usuario@test.com"); // Verifica valor Email
    expect(passwordInput.value).toBe("123456"); // Verifica valor Contraseña

    fireEvent.click(loginButton); // Simula clic en el botón de login
  });

  it('Renderiza el texto direccional "Registrarse"', () => { // Test para el enlace de registro
    render(
      <BrowserRouter>
        <LoginPages />
      </BrowserRouter>
    );

    const registerLink = screen.getByRole("link", { name: /¡Regístrate!/i }); // Obtiene el enlace de registro
    expect(registerLink).toBeInTheDocument(); // Verifica que exista en el DOM
  });
});
