import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { register } from '../../api/login_register';

interface FormData {
  nombre: string;
  email: string;
  contrasena: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    contrasena: '',
  });

  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'email') {
      setIsEmailInvalid(!validateEmail(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmailInvalid) {
      return;
    }
    try {
      const message = await register(formData);
      console.log('Usuario registrado:', message);
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <section>
      <div className="card">
        <div className="card2">
          <form onSubmit={handleSubmit} className="form">
            <p id="heading">Registrar</p>
            <div className="field">
              <Input
                value={formData.nombre}
                name="nombre"
                onChange={handleChange}
                label="Nombre"
                variant="bordered"
                className="max-w-xs focus:border-none"
                required
              />
            </div>
            <div className="field">
              <Input
                value={formData.email}
                name="email"
                onChange={handleChange}
                type="email"
                label="Email"
                variant="bordered"
                isInvalid={isEmailInvalid}
                color={isEmailInvalid ? "error" : "default"}
                errorMessage="Please enter a valid email"
                className="max-w-xs"
                required
              />
            </div>
            <div className="field">
              <Input
                value={formData.contrasena}
                name="contrasena"
                onChange={handleChange}
                type="password"
                label="Contraseña"
                variant="bordered"
                className="max-w-xs"
                required
              />
            </div>
            <Button className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg" type="submit" color="primary">Registrar</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
