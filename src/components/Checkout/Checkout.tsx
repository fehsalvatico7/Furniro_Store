import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';
import './Checkout.css';
import Header from '../Header/Header';
import Check from './Check.png';
import RodaPe from './rodape.png';
import Footer from '../Footer/Footer';

interface AddressFormState {
  name: string;
  companyName: string;
  zipCode: string;
  countryRegion: string;
  streetAddress: string;
  townCity: string;
  province: string;
  addOnAddress: string;
  emailAddress: string;
}

const AddressForm: React.FC = () => {
  const [formData, setFormData] = useState<AddressFormState>({
    name: '',
    companyName: '',
    zipCode: '',
    countryRegion: '',
    streetAddress: '',
    townCity: '',
    province: '',
    addOnAddress: '',
    emailAddress: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartContext) {
    return <div>Carregando carrinho...</div>;
  }

  const { cart } = cartContext;
  const subtotal = cart.reduce((total, item) => total + item.price, 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleZipCodeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      zipCode: value,
    }));

    if (value.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            townCity: data.localidade,
            province: data.uf,
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name) {
      setErrorMessage('Por favor, preencha o campo "Name".');
      return;
    }
    if (!paymentMethod) {
      setErrorMessage('Por favor, selecione um método de pagamento.');
      return;
    }
    console.log('Dados do formulário:', formData);
    alert('Compra realizada com êxito, aguarde envio!!');
    navigate('/checkout'); 
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.name) {
      setErrorMessage('Por favor, preencha o campo "Name".');
      return;
    }
    if (!paymentMethod) {
      setErrorMessage('Por favor, selecione um método de pagamento.');
      return;
    }
    console.log('Dados do formulário:', formData);
    alert('Compra realizada com êxito, aguarde envio!!');
    navigate('/checkout'); 
  };

  return (
    <div>
      <Header />
      <img src={Check} className='checkimg' alt="" />
      <div className="container">
        <div className='left'>
          <h1 className='titlee'>Billing details</h1>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
            />
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleZipCodeChange}
              placeholder="Zip Code"
            />
            <input
              type="text"
              name="countryRegion"
              value={formData.countryRegion}
              onChange={handleChange}
              placeholder="Country / Region"
            />
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              placeholder="Street Address"
            />
            <input
              type="text"
              name="townCity"
              value={formData.townCity}
              onChange={handleChange}
              placeholder="Town / City"
            />
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              placeholder="Province"
            />
            <input
              type="text"
              name="addOnAddress"
              value={formData.addOnAddress}
              onChange={handleChange}
              placeholder="Add-On Address"
            />
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              placeholder="Email Address"
            />
            {errorMessage && <p className="error">{errorMessage}</p>}
          </form>
        </div>
        <div className='right'>
          <p><strong>Subtotal:</strong> {subtotal.toFixed(2)} Rp</p>
          <h2 className='total'><strong>Total:</strong> {subtotal.toFixed(2)} Rp</h2>
          <br /><br />
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="bankTransfer"
              className='check'
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Direct Bank Transfer
          </label><br />
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cashOnDelivery"
              className='check'
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash On Delivery
          </label>
          <br /><br />
          <p className='txtp'>Your personal data will be used to support your experience <br />
            throughout this website, to manage access to your account, and <br />
            for other purposes described in our privacy policy.</p>
          <br /><br />
          <button className='place' onClick={handleButtonClick}>Place Order</button>
        </div>
      </div>
      <img src={RodaPe} alt="" className='rodape'/>
      <Footer />
    </div>
  );
};

export default AddressForm;
