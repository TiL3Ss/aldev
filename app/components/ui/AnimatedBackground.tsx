'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const neatRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadNeatGradient = async () => {
      try {
        // Importar dinámicamente para evitar problemas de SSR
        const { NeatGradient } = await import('@firecms/neat');
        
        if (!isMounted || !canvasRef.current) return;

        // Limpiar cualquier instancia anterior
        if (neatRef.current) {
          neatRef.current.destroy();
          neatRef.current = null;
        }

        // Configuración del gradiente animado "Dark Mode"
        neatRef.current = new NeatGradient({
          ref: canvasRef.current,
          colors: [
            { color: '#F8EDED', enabled: true },  // Crema
            { color: '#FF8225', enabled: true },  // Naranja
            { color: '#B43F3F', enabled: true },  // Borgoña
            { color: '#173B45', enabled: true },  // Azul oscuro
          ],
          speed: 0.8,
          horizontalPressure: 4,
          verticalPressure: 5,
          waveFrequencyX: 2,
          waveFrequencyY: 3,
          waveAmplitude: 5,
          shadows: 2,
          highlights: 4,
          colorSaturation: 0.7,
          colorBrightness: 1.2,
          wireframe: false,
          colorBlending: 5,
          backgroundAlpha: 1,
          interactive: true,
        });

        setIsLoaded(true);

        // Manejo de redimensionamiento con debounce
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            if (neatRef.current && canvasRef.current && isMounted) {
              try {
                neatRef.current.destroy();
                neatRef.current = new NeatGradient({
                  ref: canvasRef.current,
                  colors: [
                    { color: '#F8EDED', enabled: true },
                    { color: '#FF8225', enabled: true },
                    { color: '#B43F3F', enabled: true },
                    { color: '#173B45', enabled: true },
                  ],
                  speed: 0.8,
                  horizontalPressure: 4,
                  verticalPressure: 5,
                  waveFrequencyX: 2,
                  waveFrequencyY: 3,
                  waveAmplitude: 5,
                  shadows: 2,
                  highlights: 4,
                  colorSaturation: 0.7,
                  colorBrightness: 1.2,
                  wireframe: false,
                  colorBlending: 5,
                  backgroundAlpha: 1,
                  interactive: true,
                });
              } catch (error) {
                console.error('Error al redimensionar NeatGradient:', error);
                fallbackBackground();
              }
            }
          }, 250);
        };

        window.addEventListener('resize', handleResize);

        // Función de limpieza
        cleanupRef.current = () => {
          clearTimeout(resizeTimeout);
          window.removeEventListener('resize', handleResize);
          if (neatRef.current) {
            try {
              neatRef.current.destroy();
            } catch (error) {
              console.error('Error al limpiar NeatGradient:', error);
            }
            neatRef.current = null;
          }
        };

      } catch (error) {
        console.error('Error al cargar NeatGradient:', error);
        if (isMounted) {
          fallbackBackground();
          setIsLoaded(true); // Marcamos como cargado aunque sea con fallback
        }
      }
    };

    const fallbackBackground = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Configurar el tamaño del canvas
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          
          // Crear gradiente fallback
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#F8EDED');
          gradient.addColorStop(0.3, 'rgba(255, 130, 37, 0.3)');
          gradient.addColorStop(0.7, 'rgba(180, 63, 63, 0.2)');
          gradient.addColorStop(1, '#173B45');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
          // Fallback CSS si no hay canvas
          canvas.style.background = 'linear-gradient(135deg, #F8EDED 0%, rgba(255, 130, 37, 0.3) 50%, rgba(180, 63, 63, 0.2) 70%, #173B45 100%)';
        }
      }
    };

    // Pequeño delay para asegurar que el DOM esté listo
    const initTimeout = setTimeout(() => {
      loadNeatGradient();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(initTimeout);
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: isLoaded ? 'transparent' : 'linear-gradient(135deg, #F8EDED 0%, rgba(255, 130, 37, 0.3) 50%, rgba(180, 63, 63, 0.2) 70%, #173B45 100%)'
        }}
      />

      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Partículas flotantes */}
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#FF8225]/20 to-[#B43F3F]/20 animate-float opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + i}s`,
            }}
          />
        ))}

        {/* Patrones decorativos SVG */}
        <div className="absolute top-20 left-10 w-32 h-32 opacity-5 animate-pulse">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#173B45]">
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M20 50 Q50 20 80 50 Q50 80 20 50" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="absolute bottom-32 right-16 w-24 h-24 opacity-5 animate-pulse delay-1000">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#B43F3F]">
            <rect x="35" y="35" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 50 50)" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="absolute top-1/2 left-1/4 w-20 h-20 opacity-5 animate-pulse delay-2000">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#FF8225]">
            <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="60" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  );
};