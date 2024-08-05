import React, { useState } from 'react';
import './Footer.css';
import facebookIcon from './icons/iconFacebook.png';
import instagramIcon from './icons/iconInstagram.png';
import twitterIcon from './icons/iconTwitter.png';
import linkedinIcon from './icons/iconLink.png';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const handleSubscribe = () => {
    if (validateEmail(email)) {
      setError('');
     
      console.log('Email válido:', email);
    } else {
      setError('Por favor, insira um email válido.');
    }
  }

  return (
    <div className="footer-container">
      <div className="subcontainer">
        <h2>Furniro.</h2>
        <br />
        <br />
        400 University Drive Suite 200 Coral
        <br />
        Gables,
        <br />
        FL 33134 USA
        <br />
        <br />
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <button className="btnFooter">
            <img src={facebookIcon} alt="Facebook" />
          </button>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <button className="btnFooter">
            <img src={instagramIcon} alt="Instagram" />
          </button>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <button className="btnFooter">
            <img src={twitterIcon} alt="Twitter" />
          </button>
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <button className="btnFooter">
            <img src={linkedinIcon} alt="LinkedIn" />
          </button>
        </a>
      </div>

      <div className="subcontainer">
        <p className='textGray'>Links</p> 
        <br />
        <button className='btnHome'>Home</button> 
        <br /><br /><br />
        <button className='btnShop'>Shop</button> 
        <br /> <br /><br />
        <button className='btnAbout'>About</button> 
        <br /> <br /><br />
        <button className='btnContact'>Contact</button> 
        <br /><br /><br />
      </div>

      <div className="subcontainer">
        <p className='textGray'>Help</p> 
        <br />
        <button className='btnPayment'>Payment Option</button> 
        <br /><br /><br />
        <button className='btnReturns'>Returns</button> 
        <br /> <br /><br />
        <button className='btnPolicies'>Privacy Policies</button> 
        <br /> <br /><br />
      </div>

      <div className="subcontainer">
        <p className='textGray'>Newsletter</p> 
        <br /> 
        <br />
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="subscribe-button" onClick={handleSubscribe}>
          Subscribe
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
    
  );
};

export default Footer;

