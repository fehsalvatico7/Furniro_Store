import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseconfig';
import '../LoginStyle/Login.css'

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registro realizado com sucesso!');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h1 className='furn'>Registre-se na Furniro</h1>
      <input
      className='email'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input 
      className='password'
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> <br />
      <button className='loginBtn' type="submit">Registrar</button>
    </form>
  );
};

export default Register;
