import React, { useContext, useState } from 'react';
import { CartContext } from '../Cart/CartContext';
import './PageCart.css';
import Fundo from './Cart.png';
import Retangulo from './retang.png';
import Retangulo2 from './Frame 161.png';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import Lixo from './lixo.png'

interface CartProps {
  onClose?: () => void; 
}

const Cart: React.FC<CartProps> = () => {
  const cartContext = useContext(CartContext);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();

  if (!cartContext) {
    return <div>Carregando carrinho...</div>;
  }

  const { cart, removeProductFromCart } = cartContext;

  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: quantity,
    }));
  };

  const getSubtotal = (price: number, quantity: number) => {
    return price * quantity;
  };

  const total = cart.reduce((sum, item) => {
    const quantity = quantities[item.id] || 1;
    return sum + getSubtotal(item.price, quantity);
  }, 0);

  const getFirstTwoWords = (text: string) => {
    return text.split(' ').slice(0, 2).join(' ');
  };

  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
        <Header/>
      <div className='principal'>
        <img src={Retangulo} alt="" className='retangulo' />
        <img src={Fundo} alt="" className='fundo' />
      </div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br />
      <div style={{ display: 'flex' }}>
        <div className='left'>
          {cart.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h2>
                      {getFirstTwoWords(item.title)} - <span className="price">{item.price.toFixed(2)} Rp</span>
                      <input
                        type="number"
                        min="0"
                        value={quantities[item.id] || 1}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="quantity-input"
                      />
                      <p className="subtotal">Subtotal: {getSubtotal(item.price, quantities[item.id] || 1).toFixed(2)} Rp</p>
                    </h2>
                  </div>
                  <button
                    className="remove-item-button"
                    onClick={() => removeProductFromCart(item.id)}
                  >
                    <img src={Lixo} alt="" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="right">
          <h1>Cart Totals: <br /><br /> {total.toFixed(2)} Rp</h1>
          <button className='checkout'onClick={handleCheckoutClick}>Checkout</button>
        </div>
      </div>
      <img src={Retangulo2} alt="" />
      <Footer/>
    </div>
  );
};

export default Cart;
