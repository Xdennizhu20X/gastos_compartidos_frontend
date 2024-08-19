"use client";
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../../lib/util";
import { Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { AuroraBackground } from '../ui/aurora-background';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, contrasena });
      navigate('/dashboard'); // Redirigir al tablero después del inicio de sesión
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <AuroraBackground className="min-h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-transparent/10 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <div className="max-w-md sm:w-full w-[90%] mx-auto absolute rounded-none md:rounded-2xl mt-10 p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Iniciar Sesión
        </h2>
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Correo:</Label>
            <Input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Contraseña:</Label>
            <div className="relative inline-block">
              <Input
                name="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                type={isVisible ? "text" : "password"}
                id="password"
                placeholder="••••••••"
              />
              <button
                className="absolute inset-y-0 right-0 px-3 py-2"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-gray-500" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-gray-500" />
                )}
              </button>
            </div>
          </LabelInputContainer>
          <Button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            <BottomGradient />
          </Button>
        </form>
      </div>
    </AuroraBackground>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default LoginPage;
