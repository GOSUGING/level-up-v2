import React from "react";
import { Link } from "react-router-dom";

const CategoriesPages = () => {
  const categorias = [
    { id: "consolas", nombre: "Consolas" },
    { id: "juegos", nombre: "Juegos" },
    { id: "accesorios", nombre: "Accesorios" },
    { id: "ropa", nombre: "Ropa Gamer" },
  ];

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Categorías</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {categorias.map((cat) => (
          <Link
            key={cat.id}
            to={`/productos#${cat.id}`}
            style={{
              display: "block",
              background: "#222",
              color: "white",
              padding: "1rem",
              borderRadius: "10px",
              textDecoration: "none",
              transition: "0.3s",
            }}
          >
            {cat.nombre}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPages;
