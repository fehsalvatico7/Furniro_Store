import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import { AuthProvider } from './components/Login/authContext';
import PrivateRoute from './components/Login/PrivateRoute';
import PageCart from './components/PageCart/PageCart';
import Checkout from './components/Checkout/Checkout';
import Contact from './components/Contact/Contact';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Rotas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/pagecart" element={<PageCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/check" element={<Checkout />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
