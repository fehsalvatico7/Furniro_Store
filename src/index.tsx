import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './components/Cart/CartContext'; // Ajuste o caminho conforme necessário

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <CartProvider>
    <App />
  </CartProvider>
);
