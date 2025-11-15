// src/pages/PurchasePages.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import "../App.css"; // Asegúrate de que aquí esté el CSS que pegaste

const API_URL =
  import.meta.env.VITE_PURCHASE_API_URL ??
  import.meta.env.VITE_API_URL ??
  "http://localhost:8083";

export default function PurchasePages() {
  const { user, token } = useContext(AuthContext);     // si manejas JWT
  const { sync, clearCart } = useContext(CartContext); // para refrescar carrito luego
  const navigate = useNavigate();

  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "", // MM/YY
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");
  const [success, setSuccess] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setPayment((p) => ({ ...p, [name]: value }));
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user?.id) {
      setError("Debes iniciar sesión para comprar.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/orders/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          userId: user.id,
          payment: {
            cardName: payment.cardName,
            cardNumber: payment.cardNumber,
            expiry: payment.expiry,
            cvv: payment.cvv,
          },
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "No se pudo procesar el pago");
      }

      const data = await res.json(); // { orderId, status, total, items, message }

      // El backend ya vació el carrito en DB. Refresca el carrito del front:
      if (user?.id && sync?.fetchCartFromServer) {
        await sync.fetchCartFromServer(user.id);
      } else {
        await clearCart();
      }

      setSuccess(`Compra OK (Orden #${data.orderId}).`);
      navigate(`/purchase?ok=1&orderId=${data.orderId}`);
    } catch (err) {
      setError(err?.message || "Error en el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="page-container">
        <h3>Pagar</h3>

        {error && <div className="alert alert-danger text-center">{error}</div>}
        {success && <div className="alert alert-success text-center">{success}</div>}

        {/* Tarjeta/formulario con tu look oscuro */}
        <div className="cart-container">
          <form onSubmit={handlePay} className="payment-form">
            <div className="mb-3">
              <label className="form-label">Nombre en la tarjeta</label>
              <input
                name="cardName"
                value={payment.cardName}
                onChange={onChange}
                required
                className="form-control"
                aria-label="Nombre en la tarjeta"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Número de tarjeta</label>
              <input
                name="cardNumber"
                inputMode="numeric"
                value={payment.cardNumber}
                onChange={onChange}
                placeholder="16 dígitos"
                required
                className="form-control"
                aria-label="Número de tarjeta"
              />
            </div>

            <div className="row">
              <div className="col mb-3">
                <label className="form-label">Expira (MM/YY)</label>
                <input
                  name="expiry"
                  value={payment.expiry}
                  onChange={onChange}
                  placeholder="MM/YY"
                  required
                  className="form-control"
                  aria-label="Fecha de expiración"
                />
              </div>
              <div className="col mb-3">
                <label className="form-label">CVV</label>
                <input
                  name="cvv"
                  inputMode="numeric"
                  value={payment.cvv}
                  onChange={onChange}
                  required
                  className="form-control"
                  aria-label="CVV"
                />
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button className="btn btn-custom" type="submit" disabled={loading}>
                {loading ? "Procesando..." : "Pagar ahora"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
