import React, { useState, useCallback } from 'react';
import { useGrupos } from '../../context/GruposContext'; // Ajusta la ruta según tu estructura
import { Label } from '../ui/label'; // Asegúrate de que el componente esté en la ruta correcta
import { Input } from '../ui/input'; // Asegúrate de que el componente esté en la ruta correcta
import { Button } from '@nextui-org/react';

// Importa el componente LabelInputContainer desde donde está definido

interface EnviarInvitacionProps {
  grupoId: string;
}

const EnviarInvitacion: React.FC<EnviarInvitacionProps> = ({ grupoId }) => {
  const [email, setEmail] = useState('');
  const { sendInvitation } = useGrupos();

  const handleSendInvitation = useCallback(async () => {
    if (!email || !grupoId) {
      console.error('Email o grupoId están indefinidos:', { email, grupoId });
      return;
    }

    try {
      await sendInvitation(email, grupoId);
      console.log('Invitación enviada exitosamente');
    } catch (error) {
      console.error('Error enviando la invitación:', error);
    }
  }, [email, grupoId, sendInvitation]);

  return (
    <div className=" bg-gray-100 dark:bg-transparent rounded-lg shadow-lg">

        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Ingrese el correo electrónico"
          required
        />

      <Button
        variant="shadow"
        onClick={handleSendInvitation}
        className="w-full  bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
      >
        Enviar Invitación
      </Button>
    </div>
  );
};

export default EnviarInvitacion;
