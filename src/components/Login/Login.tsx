import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseconfig';
import { useNavigate } from 'react-router-dom';
import '../LoginStyle/Login.css'
import Moveis from './moveis.webp'
import Icon from './Meubel House_Logos-05.png'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home'); 
    } catch (error: any) {
      alert(error.message || 'Erro ao realizar login.');
    }
  };

  return (
    <div className='principal1'>
      <h1 className='furn'><img src={Icon} alt="" /> Furniro</h1>
       <img src={Moveis} className='moveis' alt="" />
      <form onSubmit={handleLogin}>
        <input className='email'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> <br />
        <input 
        className='password'
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /> <br />
        <button className='loginBtn' type="submit">Login</button>
      </form>
      <p className='reg'>
        Não tem uma conta? <a href="/register">Registre-se</a>
      </p>
    </div>
  );
};

export default Login;
