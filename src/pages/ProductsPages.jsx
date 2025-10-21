import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const products = [
  { id: 1, name: 'Catán', description: 'Juego de estrategia para 3-4 jugadores.', price: 29990, img: '/assets/img/catan.png' },
  { id: 2, name: 'Carcassonne', description: 'Juego de colocación de fichas para 2-5 jugadores.', price: 24990, img: '/assets/img/carcassonne.webp' },
  { id: 3, name: 'Control Xbox Series X', description: 'Control inalámbrico para Xbox y PC.', price: 59990, img: '/assets/img/control-xbox.webp' },
  { id: 4, name: 'Auriculares HyperX Cloud II', description: 'Sonido envolvente con micrófono desmontable.', price: 24990, img: '/assets/img/hyperxCloudII.webp' },
  { id: 5, name: 'Play Station 5', description: 'Consola de última generación de Sony.', price: 549990, img: '/assets/img/ps5.jpg' },
  { id: 6, name: 'PC Gamer ASUS ROG', description: 'Computadora gamer potente.', price: 1299990, img: '/assets/img/ROGSTRIX.png' },
  { id: 7, name: 'Silla Gamer Secretlab Titan', description: 'Máxima comodidad y soporte ergonómico.', price: 349990, img: '/assets/img/silla-gamer.jpg' },
  { id: 8, name: 'Mouse Logitech G502 HERO', description: 'Sensor óptico y 11 botones programables.', price: 49990, img: '/assets/img/mouse-logitech.jpg' },
  { id: 9, name: 'Mousepad Razer Chroma', description: 'Superficie microtexturizada con iluminación RGB.', price: 29990, img: '/assets/img/mousepad-razer.webp' },
  { id: 10, name: "Polera Level-Up", description: 'Polera de algodón personalizada para gamers.', price: 14990, img: '/assets/img/polera-gamer.png' }
];

function ProductsPages() {
  const { addToCart } = useContext(CartContext);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Tienda Level-Up!</h2>
      <Row>
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Card className="h-100">
              <Card.Img variant="top" src={product.img} style={{ height: '200px', objectFit: 'contain' }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text style={{ flex: 1 }}>{product.description}</Card.Text>
                <Card.Text className="fw-bold">${product.price.toLocaleString()}</Card.Text>
                <Button variant="success" onClick={() => addToCart(product)}>Agregar al Carrito</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductsPages;
