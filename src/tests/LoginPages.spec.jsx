import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPages from "../pages/LoginPages";

describe("Componente Login", () => {
  it('renderiza el formulario EMAIL correctamente y permite escribir', () => {
    render(
      <BrowserRouter>
        <LoginPages />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "usuario@test.com" } });
    expect(emailInput.value).toBe("usuario@test.com");
  });

  it('renderiza el formulario CONTRASEÑA correctamente y permite escribir', () => {
    render(
      <BrowserRouter>
        <LoginPages />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText(/Contraseña/i);
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: "123456" } });
    expect(passwordInput.value).toBe("123456");
  });

  it('Renderiza el botón "Iniciar Sesión" y permite usar los textfields antes de hacer clic', () => {
    render(
      <BrowserRouter>
        <LoginPages />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const loginButton = screen.getByRole("button", { name: /iniciar sesión/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "usuario@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(emailInput.value).toBe("usuario@test.com");
    expect(passwordInput.value).toBe("123456");

    fireEvent.click(loginButton);

  });

  it('Renderiza el texto direccional "Registrarse"', () => {
    render(
      <BrowserRouter>
        <LoginPages />
      </BrowserRouter>
    );

    const registerLink = screen.getByRole("link", { name: /¡Regístrate!/i });
    expect(registerLink).toBeInTheDocument();
  });
});