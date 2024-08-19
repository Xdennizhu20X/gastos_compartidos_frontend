// LoadingScreen.tsx
import React from 'react';
import { AuroraBackground } from './ui/aurora-background';

const LoadingScreen: React.FC = () => {
  return (
    <AuroraBackground className="w-full min-h-screen flex justify-center items-center text-8xl text-white font-bold">
      Loading...
    </AuroraBackground>
  );
};

export default LoadingScreen;
