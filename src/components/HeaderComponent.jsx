import React, { useContext, useState } from 'react';
import { Navbar, Nav, Container, Badge, Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

function HeaderComponent() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  const totalItems = cartItems.length;

  return (
    <Navbar collapseOnSelect expand="lg" className='custom' variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Level-up!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/registro">Registrarse</Nav.Link>
            <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>

            {/* Carrito como icono */}
            <Dropdown show={showCart} onToggle={() => setShowCart(!showCart)} align="end">
              <Dropdown.Toggle as={Button} variant="dark">
                <FaShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge bg="light" text="dark" className="ms-1">{totalItems}</Badge>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ minWidth: '300px', right: 0 }}>
                {cartItems.length === 0 ? (
                  <Dropdown.Item disabled>Carrito vacío</Dropdown.Item>
                ) : (
                  cartItems.map((item, index) => (
                    <Dropdown.Item key={index} className="d-flex justify-content-between align-items-center">
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => removeFromCart(index)}
                      >
                        X
                      </Button>
                    </Dropdown.Item>
                  ))
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;
