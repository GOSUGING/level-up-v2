import React, { useContext, useMemo, useState } from 'react';
import { Container, Row, Col, ListGroup, Form, Button, Alert, Card } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

function PurchasePages() {
  // Obtiene los ítems del carrito del contexto global.
  const { cartItems } = useContext(CartContext);

  // Calcula el monto total de la compra (optimizado con useMemo).
  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  }, [cartItems]);

  // Estado local para los campos del formulario y la retroalimentación de la validación.
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState(''); // MM/YY
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  // Función de utilidad para eliminar caracteres no numéricos.
  const sanitizeNumber = (value) => value.replace(/\D/g, '');

  // Detecta el tipo de tarjeta (visa, mastercard, amex, discover) basado en el prefijo.
  const detectCardType = (num) => {
    const n = sanitizeNumber(num);
    if (/^4/.test(n)) return 'visa';
    if (/^(5[1-5]|2[2-7])/.test(n)) return 'mastercard';
    if (/^3[47]/.test(n)) return 'amex';
    if (/^(6011|65|64[4-9])/.test(n)) return 'discover';
    return 'unknown';
  };

  // Valida el formato de la fecha de expiración (MM/YY) y verifica que no esté vencida.
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

  // Valida el CVV (3 dígitos por defecto, 4 para American Express).
  const validateCvv = (value) => {
    const type = detectCardType(cardNumber);
    const digitsOnly = /^\d+$/;
    if (!digitsOnly.test(value)) return false;
    if (type === 'amex') return value.length === 4;
    return value.length === 3;
  };

  // Valida el nombre del titular (solo letras y espacios, mínimo 2 caracteres).
  const validateName = (value) => {
    const re = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{2,}$/;
    return re.test(value.trim());
  };

  // Formatea el número de tarjeta para mostrarlo con espacios (4-4-4-4 o 4-6-5 para Amex).
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

  // Manejador del pago: ejecuta todas las validaciones y simula la transacción.
  const handlePay = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Ejecución de validaciones
    if (!validateName(cardName)) newErrors.cardName = 'Nombre inválido (solo letras y espacios).';
    const digits = sanitizeNumber(cardNumber);
    if (!digits) newErrors.cardNumber = 'Por favor ingrese el número de tarjeta.';
    else if (digits.length !== 16) newErrors.cardNumber = 'El número de tarjeta debe tener 16 dígitos.';
    if (!validateExpiry(expiry)) newErrors.expiry = 'Fecha inválida. Usa formato MM/YY y que no esté vencida.';
    if (!validateCvv(cvv)) newErrors.cvv = 'CVV inválido.';

    setErrors(newErrors);
    setSuccess('');

    // Si no hay errores, simula el éxito
    if (Object.keys(newErrors).length === 0) {
      // Es una maqueta: no se envía a ningún servicio.
      setSuccess('Pago simulado exitosamente. ¡Gracias por tu compra!');
    }
  };

  // Tipo de tarjeta detectado para modificar la UI (ej. longitud del CVV)
  const cardType = detectCardType(cardNumber);

  // Estructura de la página (Resumen del carrito + Formulario de Pago)
  return (
    <main>
      <Container className="page-container">
        <h2>Resumen de Compra</h2>
        <Row className="mt-3">
          {/* Columna de resumen del carrito */}
          <Col md={6}>
            <Card className="cart-container">
              <Card.Body>
                <h5 className="cart-title">Tu Carrito</h5>
                {cartItems.length === 0 ? (
                  <p>Tu carrito está vacío.</p>
                ) : (
                  <ListGroup>
                    {/* Lista de ítems */}
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

          {/* Columna del formulario de pago */}
          <Col md={6}>
            <div className="form-container">
              <h5>Datos de la Tarjeta</h5>
              {/* Alerta de éxito */}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handlePay}>
                {/* Campo: Nombre del titular */}
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

                {/* Campo: Número de tarjeta (muestra formateado, guarda sanitizado) */}
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
                  {/* Campo: Fecha de vencimiento */}
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
                  {/* Campo: CVV (la etiqueta y placeholder cambian por tipo de tarjeta) */}
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

                {/* Botón de pago (deshabilitado si el carrito está vacío) */}
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

export default PurchasePages;