import React, { useState, useEffect } from 'react';
import axios from '../../api/axios'; // Ajusta la ruta según tu estructura

const CreateExpenseForm: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [grupoId, setGrupoId] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (storedUserId && token) {
      setUserId(storedUserId);
      console.log('User ID:', storedUserId);
      console.log('Token present:', !!token);
    } else {
      console.error('No se encontró el ID del usuario o el token en localStorage.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!userId) {
      setError('No se pudo obtener el ID del usuario.');
      return;
    }
  
    const data = {
      nombre,
      precio: Number(precio),  // Convertir precio a número
      grupoId,
      fechaVencimiento,
      usuarioCreador: userId  // Enviar solo el ID del usuario
    };
  
    console.log('Enviando datos al backend:', data); // Log para mostrar lo que se está enviando
  
    try {
      const response = await axios.post('/gastos', data);
      setSuccess(response.data.message);
      setError(null);
  
      // Limpiar el formulario
      setNombre('');
      setPrecio('');
      setGrupoId('');
      setFechaVencimiento('');
    } catch (err) {
      console.error('Error en la solicitud:', err.response?.data);
      setError(err.response?.data?.error || 'Error al crear el gasto');
      setSuccess(null);
    }
  };

  return (
    <div className='pt-20'>
      <h2>Crear Nuevo Gasto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="grupoId">ID del Grupo:</label>
          <input
            type="text"
            id="grupoId"
            value={grupoId}
            onChange={(e) => setGrupoId(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="fechaVencimiento">Fecha de Vencimiento:</label>
          <input
            type="date"
            id="fechaVencimiento"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            required
          />
        </div>
        <button  type="submit">Crear Gasto</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      
      {/* Mostrar el ID del usuario en la interfaz */}
      <div>
        <p><strong>ID del Usuario:</strong> {userId}</p>
      </div>
    </div>
  );
};

export default CreateExpenseForm;
