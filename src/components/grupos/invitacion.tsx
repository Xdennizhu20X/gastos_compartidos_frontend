import React, { useState, useCallback } from 'react';
import { useGrupos } from '../../context/GruposContext';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '@nextui-org/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; // Para integrar SweetAlert2 con React

const MySwal = withReactContent(Swal);

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

    MySwal.fire({
      title: 'Enviando invitación...',
      text: 'Por favor espera mientras enviamos la invitación.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await sendInvitation(email, grupoId);

      MySwal.fire({
        title: '¡Invitación enviada!',
        text: `La invitación fue enviada con éxito a ${email}.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      console.error('Error enviando la invitación:', error);
      MySwal.fire({
        title: 'Error',
        text: 'Hubo un error al enviar la invitación. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }, [email, grupoId, sendInvitation]);

  return (
    <div className="bg-gray-100 dark:bg-transparent rounded-lg shadow-lg p-4">
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
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
      >
        Enviar Invitación
      </Button>
    </div>
  );
};

export default EnviarInvitacion;
