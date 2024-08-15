import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {  Button } from "@nextui-org/react";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, contrasena });
      // Redirigir a otra página si es necesario
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <form className='pt-20 bg-black' onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <Button  type="submit">Iniciar sesión</Button>
    </form>
  );
};

export default LoginPage;
