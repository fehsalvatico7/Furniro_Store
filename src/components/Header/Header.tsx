import React, { useState } from 'react';
import './Header.css';
import Logo from './images/logoLoja.png';
import Icone1 from './icons/icone1.png';
import Icone2 from './icons/icone2.png';
import { useNavigate } from 'react-router-dom';
import Cart from '../Cart/Cart';

const Header: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleCartClick = () => {
    setCartOpen(true);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="header-container">
      <div className="box one-box">
        <img src={Logo} alt="Logo" className='logo' />
      </div>
      <div className="box two-box">
        <button className='btnHome' onClick={() => navigate('/home')}>Home</button>
        <button className='btnShop' onClick={() => navigate('/shop')}>Shop</button>
        <button className='btnAbout' onClick={() => navigate('/about')}>About</button>
        <button className='btnContact' onClick={() => navigate('/contact')}>Contact</button>
      </div>
      <div className="box three-box">
        <button className='btnIcone' onClick={handleLoginClick}>
          <img src={Icone1} alt="Login" />
        </button>
        <button className='btnIcone' onClick={handleCartClick}>
          <img src={Icone2} alt="Carrinho" />
        </button>
      </div>
      {isCartOpen && <Cart onClose={handleCloseCart} />}
    </div>
  );
};

export default Header;
