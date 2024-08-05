import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';
import Header from '../Header/Header';
import Top from './Contact.png';
import RodaPe from './rodape.png';
import Vec1 from './Vector (5).png';
import Vec2 from './Vector (6).png';
import Vec3 from './Vector (7).png';
import Footer from '../Footer/Footer';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      navigate('/home');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div>
      <Header />
      <img src={Top} alt="" className='
      top'/>

      <div className='contact-container'>
        <div className='left'>
          <h1><img src={Vec1} alt="" /> Address</h1>
          <p>236 5th SE Avenue, New <br />York NY10000, United <br />States</p>
          <br /><br />
          <h1><img src={Vec2} alt="" />Phone</h1>
          <p>Mobile: +(84) 546-6789 <br />Hotline: +(84) 456-6789</p>
          <br /><br />
          <h1><img src={Vec3} alt="" />Working Time</h1>
          <p>Monday-Friday: 9:00 - 22:00 <br />Saturday-Sunday: 9:00 - 21:00</p>
        </div>

        <div className='right'>
          <form onSubmit={handleSubmit}>
            <div className="input-column">
              <label htmlFor="name">Your name</label><br />
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="input-column"><br />
              <label htmlFor="email">Email address</label><br />
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="input-column"><br />
              <label htmlFor="subject">Subject</label><br />
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="input-column"><br />
              <label htmlFor="message">Message</label><br />
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div><br />
            <button className='submit' type="submit">Submit</button>
          </form>
        </div>
      </div>
      <img src={RodaPe} alt="" className='rodape' />
      <Footer />
    </div>
  );
};

export default Contact;
