import React, { useState, useEffect } from 'react';
import { useGastos } from '../../context/GastoContext';
import { useGrupos } from '../../context/GruposContext';

const CrearGasto: React.FC = () => {
  const { createGasto } = useGastos();
  const { grupos, getGrupos } = useGrupos();

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [grupo, setGrupoId] = useState(''); // Estado para el ID del grupo

  useEffect(() => {
    getGrupos();
  }, [getGrupos]);

  const decodeToken = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));

    return JSON.parse(jsonPayload);
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      console.log('Decoded Token:', decoded);
      return decoded.id; // Ajusta según el campo correcto del token
    }
    return '';
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const usuarioCreador = getUserIdFromToken();

    console.log('Datos a enviar:', {
      nombre,
      precio,
      fechaVencimiento,
      grupo, // Usa el ID del grupo
      usuarioCreador,
    });

    if (usuarioCreador) {
      try {
        await createGasto({
          nombre,
          precio,
          fechaVencimiento,
          grupo, // Envía el ID del grupo
          usuarioCreador,
        });
        console.log('Gasto creado con éxito');
      } catch (error) {
        console.error('Error creando gasto:', error);
      }
    } else {
      console.error('ID de usuario no encontrado');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del gasto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(parseFloat(e.target.value))}
        required
      />
      <input
        type="date"
        placeholder="Fecha de Vencimiento"
        value={fechaVencimiento}
        onChange={(e) => setFechaVencimiento(e.target.value)}
        required
      />
      <select
        value={grupo} // Usa el ID del grupo como valor
        onChange={(e) => setGrupoId(e.target.value)} // Actualiza el estado con el ID
        required
      >
        <option value="">Selecciona un grupo</option>
        {grupos.map((g) => (
          <option key={g.id} value={g.id}> {/* Usa el ID del grupo aquí */}
            {g.nombre}
          </option>
        ))}
      </select>
      <button type="submit">Crear Gasto</button>
    </form>
  );
};

export default CrearGasto;
