// app/components/ui/LoadingSpinner.tsx
'use client';

import { Spinner } from '@heroui/react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  variant?: 'default' | 'blur' | 'minimal' | 'pulsing';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  className = '',
  size = 'lg',
  message = 'Cargando...',
  variant = 'default'
}) => {
  const sizeConfig = {
    sm: { 
      container: 'min-h-[200px]',
      spinner: 'sm' as const,
      text: 'text-sm',
      dots: 'w-2 h-2',
      blur: 'w-16 h-16'
    },
    md: { 
      container: 'min-h-[300px]',
      spinner: 'md' as const,
      text: 'text-base',
      dots: 'w-3 h-3',
      blur: 'w-24 h-24'
    },
    lg: { 
      container: 'min-h-[400px]',
      spinner: 'lg' as const,
      text: 'text-lg',
      dots: 'w-4 h-4',
      blur: 'w-32 h-32'
    }
  };

  const config = sizeConfig[size];

  if (variant === 'minimal') {
    return (
      <div className={`
        flex flex-col items-center justify-center py-8
        ${config.container} ${className}
      `}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Spinner
            size={config.spinner}
            classNames={{
              circle1: "border-b-blue-500",
              circle2: "border-b-purple-500",
            }}
          />
        </motion.div>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className={`mt-4 text-gray-600 dark:text-gray-400 font-medium ${config.text}`}
          >
            {message}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'pulsing') {
    return (
      <div className={`
        flex flex-col items-center justify-center py-12
        ${config.container} ${className}
      `}>
        <div className="relative">
          {/* Pulsing circles */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
            className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              ${config.blur} bg-blue-500/20 rounded-full blur-xl
            `}
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
            className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              ${config.blur} bg-purple-500/20 rounded-full blur-2xl
            `}
          />
          
          {/* Center spinner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Spinner
              size={config.spinner}
              classNames={{
                circle1: "border-b-blue-600 dark:border-b-blue-400",
                circle2: "border-b-purple-600 dark:border-b-purple-400",
              }}
            />
          </motion.div>
        </div>

        {message && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={`
              mt-6 text-gray-700 dark:text-gray-300 font-medium text-center
              ${config.text}
            `}
          >
            {message}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'blur') {
    return (
      <div className={`
        flex flex-col items-center justify-center py-12
        bg-white/60 dark:bg-black/40 backdrop-blur-3xl
        border border-black/5 dark:border-white/10
        rounded-3xl ${config.container} ${className}
      `}>
        <div className="relative">
          {/* Background blur effects */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl" />
          
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="
              p-6 rounded-3xl bg-white/70 dark:bg-black/50 backdrop-blur-xl
              border border-gray-200/50 dark:border-gray-600/50
              shadow-lg shadow-black/5 dark:shadow-white/10
              mb-6
            ">
              <Spinner
                size={config.spinner}
                classNames={{
                  circle1: "border-b-blue-600 dark:border-b-blue-400",
                  circle2: "border-b-purple-600 dark:border-b-purple-400",
                }}
              />
            </div>

            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={`
                  text-gray-700 dark:text-gray-300 font-semibold text-center
                  ${config.text}
                `}
              >
                {message}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`
      flex flex-col items-center justify-center py-12
      ${config.container} ${className}
    `}>
      <div className="relative">
        {/* Animated dots background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                className={`
                  ${config.dots} rounded-full
                  ${i % 3 === 0 ? 'bg-blue-400/40' : i % 3 === 1 ? 'bg-purple-400/40' : 'bg-pink-400/40'}
                `}
              />
            ))}
          </div>
        </div>

        {/* Center glassmorphism container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="
            relative z-10 p-8 rounded-3xl
            bg-white/70 dark:bg-black/50 backdrop-blur-3xl
            border border-gray-200/50 dark:border-gray-600/50
            shadow-xl shadow-black/5 dark:shadow-white/10
          "
        >
          {/* Gradient orb */}
          <div className="
            w-20 h-20 rounded-full mx-auto mb-4
            bg-gradient-to-br from-blue-500/20 via-purple-500/30 to-pink-500/20
            backdrop-blur-xl border border-white/20 dark:border-white/10
            flex items-center justify-center relative overflow-hidden
          ">
            {/* Inner glow */}
            <div className="
              absolute inset-2 rounded-full
              bg-gradient-to-br from-white/40 to-transparent
              dark:from-white/20 dark:to-transparent
            " />
            
            {/* Spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative z-10"
            >
              <Spinner
                size={config.spinner}
                classNames={{
                  circle1: "border-b-blue-600 dark:border-b-blue-400",
                  circle2: "border-b-purple-600 dark:border-b-purple-400",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className={`
            text-gray-700 dark:text-gray-300 font-semibold mb-2
            ${config.text}
          `}>
            {message}
          </p>
          
          {/* Animated dots for loading text */}
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};