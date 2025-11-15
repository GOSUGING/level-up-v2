// src/pages/ProductsPages.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { useLocation, Link } from "react-router-dom";
import "../App.css";

const PRODUCTS = [
  { id: 1, name: "Catán", description: "Juego de estrategia para 3-4 jugadores.", price: 29990, img: "/assets/img/catan.png", category: "juegos" },
  { id: 2, name: "Carcassonne", description: "Juego de colocación de fichas para 2-5 jugadores.", price: 24990, img: "/assets/img/carcassonne.webp", category: "juegos" },
  { id: 3, name: "Control Xbox Series X", description: "Control inalámbrico para Xbox y PC.", price: 59990, img: "/assets/img/control-xbox.webp", category: "accesorios" },
  { id: 4, name: "Auriculares HyperX Cloud II", description: "Sonido envolvente con micrófono desmontable.", price: 24990, img: "/assets/img/hyperxCloudII.webp", category: "accesorios" },
  { id: 5, name: "Play Station 5", description: "Consola de última generación de Sony.", price: 549990, img: "/assets/img/ps5.jpg", category: "consolas" },
  { id: 6, name: "PC Gamer ASUS ROG", description: "Computadora gamer potente.", price: 1299990, img: "/assets/img/ROGSTRIX.png", category: "consolas" },
  { id: 7, name: "Silla Gamer Secretlab Titan", description: "Máxima comodidad y soporte ergonómico.", price: 349990, img: "/assets/img/silla-gamer.jpg", category: "accesorios" },
  { id: 8, name: "Mouse Logitech G502 HERO", description: "Sensor óptico y 11 botones programables.", price: 49990, img: "/assets/img/mouse-logitech.jpg", category: "accesorios" },
  { id: 9, name: "Mousepad Razer Chroma", description: "Superficie microtexturizada con iluminación RGB.", price: 29990, img: "/assets/img/mousepad-razer.webp", category: "accesorios" },
  { id: 10, name: "Polera Level-Up", description: "Polera de algodón personalizada para gamers.", price: 14990, img: "/assets/img/polera-gamer.png", category: "ropa" }
];

const CATEGORIES = ["consolas", "juegos", "accesorios", "ropa"];
const PLACEHOLDER = "/assets/img/placeholder.png"; // opcional

export default function ProductsPages() {
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const [categoria, setCategoria] = useState("");

  // Lee el hash y valida (ej: /productos#juegos)
  useEffect(() => {
    const hash = (location.hash || "").replace("#", "").toLowerCase();
    setCategoria(CATEGORIES.includes(hash) ? hash : "");
    window.scrollTo(0, 0);
  }, [location]);

  const productosFiltrados = useMemo(
    () => (categoria ? PRODUCTS.filter((p) => p.category === categoria) : PRODUCTS),
    [categoria]
  );

  const titulo = categoria
    ? `Categoría: ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`
    : "Tienda Level-Up!";

  const handleAdd = (product) => {
    // CartContext espera {id, name, price, ...}
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        imageUrl: product.img,
        description: product.description,
        category: product.category,
      },
      1
    );
  };

  return (
    <Container className="mt-4 page-container">
      <div className="text-center mb-4">
        <h2>{titulo}</h2>
        <Link to="/categorias" className="btn btn-outline-secondary mt-2">
          Volver a Categorías
        </Link>
      </div>

      <Row>
        {productosFiltrados.map((p) => (
          <Col key={p.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Card className="h-100 shadow-sm card">
              <Card.Img
                variant="top"
                src={p.img || PLACEHOLDER}
                alt={p.name}
                onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="card-title">{p.name}</Card.Title>
                <Card.Text className="card-text" style={{ flex: 1 }}>
                  {p.description}
                </Card.Text>
                <Card.Text className="fw-bold text-center mb-2">
                  ${(Number(p.price) || 0).toLocaleString("es-CL")}
                </Card.Text>
                <button className="btn btn-custom w-100" onClick={() => handleAdd(p)}>
                  Agregar al Carrito 🛒
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {productosFiltrados.length === 0 && (
          <p className="text-center">No hay productos en esta categoría.</p>
        )}
      </Row>
    </Container>
  );
}
