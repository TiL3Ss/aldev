// app/components/ui/LoadingSpinner.tsx
'use client';

import { Spinner } from '@heroui/react';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  className = '',
  size = 'lg',
  message = 'Cargando...'
}) => {
  return (
    <div className={`
      flex flex-col items-center justify-center
      min-h-[400px] py-12
      ${className}
    `}>
      <Spinner
        size={size}
        classNames={{
          circle1: "border-b-orange",
          circle2: "border-b-burgundy",
        }}
      />
      {message && (
        <p className="mt-4 text-navy/70 font-medium">
          {message}
        </p>
      )}
    </div>
  );
};