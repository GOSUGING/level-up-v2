import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
import HeaderComponent from './components/HeaderComponent';
import HomePages from './pages/HomePages';  
import ProductsPages from './pages/ProductsPages';
import ProductDetailPage from './pages/ProductDetailPage';
import RegisterPages from './pages/RegisterPages';
import LoginPages from './pages/LoginPages';
import PurchasePages from './pages/PurchasePages';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './components/Footer';

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
            <Route path='/' element={<HomePages />} />
            <Route path='/productos' element={<ProductsPages />} />
            <Route path='/productos/:id' element={<ProductDetailPage />} />
            <Route path='/registro' element={<RegisterPages />} />
            <Route path='/login' element={<LoginPages />} />
            <Route path='/pago' element={<PurchasePages />} />
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}
