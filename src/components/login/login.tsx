import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, contrasena });
      navigate('/dashboard'); // Redirigir al tablero después del inicio de sesión
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert(error.message || 'Error en el inicio de sesión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
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
        disabled={loading}
      />
      <input
        type="password"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        placeholder="Contraseña"
        required
        disabled={loading}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </Button>
    </form>
  );
};
export default LoginPage;
