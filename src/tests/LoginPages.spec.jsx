import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPages from "../pages/LoginPages";

describe("Componente Login", () => {
  it("renderiza el formulario correctamente", () => {
    render(
      <MemoryRouter>
        <LoginPages />
      </MemoryRouter>
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Contraseña")).toBeInTheDocument();
  });
});