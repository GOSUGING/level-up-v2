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


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </CartProvider>
  )
}

export default App;
