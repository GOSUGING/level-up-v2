import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import HeaderComponent from "./components/HeaderComponent";
import HomePages from "./pages/HomePages";
import ProductsPages from "./pages/ProductsPages";
import RegisterPages from "./pages/RegisterPages";
import LoginPages from "./pages/LoginPages";
import Footer from "./components/Footer";
import CategoriesPages from "./pages/CategoriesPages";
import PurchasePages from "./pages/PurchasePages";
import PerfilPages from "./pages/ProfilePages";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HeaderComponent />
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePages />} />
            <Route path="/productos" element={<ProductsPages />} />
            <Route path="/registro" element={<RegisterPages />} />
            <Route path="/login" element={<LoginPages />} />
            <Route path="/categorias" element={<CategoriesPages />} />
            <Route
              path="/purchase"
              element={
                <ProtectedRoute>
                  <PurchasePages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <PerfilPages />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}
