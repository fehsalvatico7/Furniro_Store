import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';
import './Cart.css';

interface CartProps {
  onClose?: () => void; 
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartContext) {
    return <div>Carregando carrinho...</div>;
  }

  const { cart, removeProductFromCart } = cartContext;

  const subtotal = cart.reduce((total, item) => total + item.price, 0);

  const handleCartClick = () => {
    navigate('/pageCart');
  };

  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  return (
    <>
      {onClose && <div className="modal-overlay" onClick={onClose}></div>}
      <div className="cart">
        <h1>Shopping Cart</h1>
        {cart.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h2>{item.title}</h2>
                  <p className='price'>{item.price.toFixed(2)} Rp</p>
                </div>
                <button 
                  className="remove-item-button" 
                  onClick={() => removeProductFromCart(item.id)} 
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="cart-footer">
          <p className='subtotall'><strong>Subtotal:</strong> {subtotal.toFixed(2)} Rp</p>
          <button className="cartBtn" onClick={handleCartClick}>Cart</button>
          <button className='checkout' onClick={handleCheckoutClick}>Checkout</button>
          <button className='comparison'>Comparison</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
