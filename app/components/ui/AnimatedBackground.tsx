// components/ui/AnimatedBackground.tsx
'use client';

import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Importación dinámica de Neat para evitar problemas de SSR
    const initNeat = async () => {
  try {
    const { NeatGradient } = await import('@firecms/neat');
    
    const config = {
      colors: [
        { color: '#F8EDED', opacity: 0.8 },
        { color: '#FF8225', opacity: 0.6 },
        { color: '#B43F3F', opacity: 0.4 },
        { color: '#173B45', opacity: 0.3 },
      ],
      speed: 0.8,
      horizontalPressure: 4,
      verticalPressure: 5,
      waveFrequencyX: 2,
      waveFrequencyY: 3,
      waveAmplitude: 5,
      shadows: 2,
      highlights: 4,
      colorSaturation: 7,
      colorBrightness: 1.2,
      wireframe: false,
      density: 0.75,
      backgroundColor: '#F8EDED',
    };

        const neat = new NeatGradient(canvasRef.current!, config);
    neat.speed = 0.8;

    return () => {
      try {
        neat?.destroy?.();
      } catch (error) {
        console.warn('Error destroying NeatGradient instance:', error);
      }
    };
  } catch (error) {
    console.warn('Error loading @firecms/neat:', error);
    fallbackBackground();
  }
};

    // Función de fallback con CSS puro
    const fallbackBackground = () => {
      if (canvasRef.current) {
        canvasRef.current.style.display = 'none';
      }
    };

    initNeat();
  }, []);

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      {/* Canvas para Neat */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{
          background: 'linear-gradient(135deg, #F8EDED 0%, rgba(255, 130, 37, 0.1) 100%)',
        }}
      />
      
      {/* Fallback CSS background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-orange/10 to-burgundy/10 animate-gradient" 
           style={{ backgroundSize: '400% 400%' }} />
      
      {/* Overlay sutil para mejor legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/20" />
      
      {/* Elementos decorativos orientales */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Partículas flotantes */}
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className={`
              absolute w-2 h-2 rounded-full bg-gradient-to-r from-orange/20 to-burgundy/20
              animate-float opacity-30
            `}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + i}s`,
            }}
          />
        ))}
        
        {/* Elementos decorativos orientales */}
        <div className="absolute top-20 left-10 w-32 h-32 opacity-5 animate-pulse">
          <svg viewBox="0 0 100 100" className="w-full h-full text-navy">
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M20 50 Q50 20 80 50 Q50 80 20 50" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        
        <div className="absolute bottom-32 right-16 w-24 h-24 opacity-5 animate-pulse delay-1000">
          <svg viewBox="0 0 100 100" className="w-full h-full text-burgundy">
            <rect x="35" y="35" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 50 50)" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        
        <div className="absolute top-1/2 left-1/4 w-20 h-20 opacity-5 animate-pulse delay-2000">
          <svg viewBox="0 0 100 100" className="w-full h-full text-orange">
            <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="60" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  );
};