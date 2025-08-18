'use client';

import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createGradient = (time: number) => {
      const centerX = canvas.width / 2 + Math.sin(time * 0.001) * 100;
      const centerY = canvas.height / 2 + Math.cos(time * 0.0015) * 100;
      
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.max(canvas.width, canvas.height)
      );

      // Colores de tu paleta
      const colors = [
        '#F8EDED', // cream
        '#FF8225', // orange
        '#B43F3F', // burgundy
        '#173B45'  // navy
      ];

      const t = (Math.sin(time * 0.0008) + 1) / 2;
      
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(0.3 + t * 0.2, `${colors[1]}66`);
      gradient.addColorStop(0.6 + t * 0.1, `${colors[2]}44`);
      gradient.addColorStop(1, colors[3]);

      return gradient;
    };

    const animate = (currentTime: number) => {
      timeRef.current = currentTime;
      
      // Limpiar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Aplicar gradiente animado
      ctx.fillStyle = createGradient(currentTime);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Agregar ondas sutiles
      for (let i = 0; i < 3; i++) {
        const wave = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        const offset = (currentTime * 0.0005 + i * Math.PI / 1.5) % (Math.PI * 2);
        const opacity = (Math.sin(offset) + 1) / 2 * 0.1;
        
        wave.addColorStop(0, `rgba(255, 130, 37, ${opacity})`);
        wave.addColorStop(0.5, `rgba(180, 63, 63, ${opacity * 0.7})`);
        wave.addColorStop(1, `rgba(23, 59, 69, ${opacity * 0.5})`);
        
        ctx.fillStyle = wave;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Configuración inicial
    resizeCanvas();
    animate(0);

    // Manejar redimensionamiento
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      {/* Canvas animado */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{
          background: 'linear-gradient(135deg, #F8EDED 0%, rgba(255, 130, 37, 0.3) 50%, rgba(180, 63, 63, 0.2) 70%, #173B45 100%)'
        }}
      />

      {/* Overlay con gradiente CSS como fallback/complemento */}
      <div className="absolute inset-0 opacity-30 animate-pulse-slow bg-gradient-to-br from-cream/20 via-transparent to-navy/20" />

      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Partículas flotantes */}
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-orange/20 to-burgundy/20 animate-float opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + i}s`,
            }}
          />
        ))}

        {/* Círculos decorativos más grandes */}
        <div className="absolute top-20 left-10 w-32 h-32 opacity-5 animate-pulse">
          <div className="w-full h-full rounded-full border-2 border-navy/30" />
          <div className="absolute inset-6 rounded-full border border-navy/20" />
          <div className="absolute inset-12 rounded-full bg-navy/10" />
        </div>

        <div className="absolute bottom-32 right-16 w-24 h-24 opacity-5 animate-pulse delay-1000">
          <div className="w-full h-full rotate-45 border-2 border-burgundy/30" />
          <div className="absolute inset-3 rounded-full border border-burgundy/20" />
        </div>

        <div className="absolute top-1/2 left-1/4 w-20 h-20 opacity-5 animate-pulse delay-2000">
          <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[60px] border-b-orange/30" />
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border border-orange/20" />
        </div>

        {/* Efecto de brillo sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cream/5 to-transparent animate-gradient" />
      </div>
    </div>
  );
};