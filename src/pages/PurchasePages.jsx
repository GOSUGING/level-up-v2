import React, { useContext, useMemo, useState } from 'react';
import { Container, Row, Col, ListGroup, Form, Button, Alert, Card } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

function PurchagePages() {
  const { cartItems } = useContext(CartContext);

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  }, [cartItems]);

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState(''); // MM/YY
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const sanitizeNumber = (value) => value.replace(/\D/g, '');

  const detectCardType = (num) => {
    const n = sanitizeNumber(num);
    if (/^4/.test(n)) return 'visa';
    if (/^(5[1-5]|2[2-7])/.test(n)) return 'mastercard';
    if (/^3[47]/.test(n)) return 'amex';
    if (/^(6011|65|64[4-9])/.test(n)) return 'discover';
    return 'unknown';
  };

  const validateExpiry = (value) => {
    // Expect MM/YY
    const match = value.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    if (!match) return false;
    const month = parseInt(match[1], 10);
    const year = 2000 + parseInt(match[2], 10);

    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 1-12
    const currentYear = now.getFullYear();

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    return true;
  };

  const validateCvv = (value) => {
    const type = detectCardType(cardNumber);
    const digitsOnly = /^\d+$/;
    if (!digitsOnly.test(value)) return false;
    if (type === 'amex') return value.length === 4;
    return value.length === 3;
  };

  const validateName = (value) => {
    const re = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{2,}$/;
    return re.test(value.trim());
  };

  const validateCardNumber = (num) => {
    const n = sanitizeNumber(num);
    return n.length === 16;
  };

  const formatCardNumber = (num) => {
    const n = sanitizeNumber(num);
    const type = detectCardType(num);
    if (type === 'amex') {
      // 4 6 5 grouping: 1234 567890 12345
      return n.replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*/, (m, g1, g2, g3) =>
        [g1, g2, g3].filter(Boolean).join(' ')
      );
    }
    // default 4-4-4-4
    return n.replace(/(.{1,4})/g, '$1 ').trim();
  };

  const handlePay = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateName(cardName)) newErrors.cardName = 'Nombre inválido (solo letras y espacios).';
    const digits = sanitizeNumber(cardNumber);
    if (!digits) newErrors.cardNumber = 'Por favor ingrese el número de tarjeta.';
    else if (digits.length !== 16) newErrors.cardNumber = 'El número de tarjeta debe tener 16 dígitos.';
    if (!validateExpiry(expiry)) newErrors.expiry = 'Fecha inválida. Usa formato MM/YY y que no esté vencida.';
    if (!validateCvv(cvv)) newErrors.cvv = 'CVV inválido.';

    setErrors(newErrors);
    setSuccess('');

    if (Object.keys(newErrors).length === 0) {
      // Es una maqueta: no se envía a ningún servicio.
      setSuccess('Pago simulado exitosamente. ¡Gracias por tu compra!');
    }
  };

  const cardType = detectCardType(cardNumber);

  return (
    <main>
      <Container className="page-container">
        <h2>Resumen de Compra</h2>
        <Row className="mt-3">
          <Col md={6}>
            <Card className="cart-container">
              <Card.Body>
                <h5 className="cart-title">Tu Carrito</h5>
                {cartItems.length === 0 ? (
                  <p>Tu carrito está vacío.</p>
                ) : (
                  <ListGroup>
                    {cartItems.map((item) => (
                      <ListGroup.Item key={item.id} className="cart-list-item">
                        <span>{item.name}</span>
                        <span>${(item.price || 0).toLocaleString()}</span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
                <div className="cart-total mt-3">
                  Total: <strong>${total.toLocaleString()}</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <div className="form-container">
              <h5>Datos de la Tarjeta</h5>
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handlePay}>
                <Form.Group className="mb-3" controlId="cardName">
                  <Form.Label>Nombre del titular</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Juan Pérez"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    isInvalid={!!errors.cardName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.cardName}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="cardNumber">
                  <Form.Label>Número de tarjeta</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="#### #### #### ####"
                    value={formatCardNumber(cardNumber)}
                    onChange={(e) => setCardNumber(sanitizeNumber(e.target.value))}
                    isInvalid={!!errors.cardNumber}
                  />
                  <Form.Control.Feedback type="invalid">{errors.cardNumber}</Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="expiry">
                      <Form.Label>Fecha de vencimiento (MM/YY)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        isInvalid={!!errors.expiry}
                      />
                      <Form.Control.Feedback type="invalid">{errors.expiry}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="cvv">
                      <Form.Label>CVV {cardType === 'amex' ? '(4 dígitos)' : '(3 dígitos)'}</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder={cardType === 'amex' ? '####' : '###'}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        isInvalid={!!errors.cvv}
                      />
                      <Form.Control.Feedback type="invalid">{errors.cvv}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  variant="success"
                  className="w-100"
                  disabled={cartItems.length === 0}
                >
                  Pagar
                </Button>
                {cartItems.length === 0 && (
                  <small className="text-muted d-block mt-2">Agrega productos al carrito para poder pagar.</small>
                )}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default PurchagePages;