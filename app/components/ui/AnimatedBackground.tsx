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

    // Colores de tu paleta en formato RGB para facilitar manipulación
    const colors = {
      cream: { r: 248, g: 237, b: 237 },
      orange: { r: 255, g: 130, b: 37 },
      burgundy: { r: 180, g: 63, b: 63 },
      navy: { r: 23, g: 59, b: 69 }
    };

    // Configuración de "blobs" estilo iOS 18
    const blobs = [
      {
        x: 0.2,
        y: 0.3,
        radius: 0.3,
        color: colors.cream,
        speedX: 0.0003,
        speedY: 0.0002,
        pulseSpeed: 0.001,
        opacity: 0.8
      },
      {
        x: 0.7,
        y: 0.2,
        radius: 0.25,
        color: colors.orange,
        speedX: -0.0002,
        speedY: 0.0004,
        pulseSpeed: 0.0015,
        opacity: 0.6
      },
      {
        x: 0.1,
        y: 0.7,
        radius: 0.35,
        color: colors.burgundy,
        speedX: 0.0004,
        speedY: -0.0003,
        pulseSpeed: 0.0008,
        opacity: 0.5
      },
      {
        x: 0.8,
        y: 0.8,
        radius: 0.2,
        color: colors.navy,
        speedX: -0.0003,
        speedY: -0.0002,
        pulseSpeed: 0.0012,
        opacity: 0.7
      },
      {
        x: 0.5,
        y: 0.5,
        radius: 0.4,
        color: colors.orange,
        speedX: 0.0001,
        speedY: 0.0003,
        pulseSpeed: 0.0006,
        opacity: 0.3
      }
    ];

    const createRadialGradient = (centerX: number, centerY: number, radius: number, color: any, opacity: number) => {
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      
      const { r, g, b } = color;
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
      gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${opacity * 0.6})`);
      gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${opacity * 0.3})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      
      return gradient;
    };

    const animate = (currentTime: number) => {
      timeRef.current = currentTime;
      const time = currentTime * 0.001; // Convertir a segundos
      
      // Fondo base con gradiente sutil
      const baseGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      baseGradient.addColorStop(0, '#F8EDED');
      baseGradient.addColorStop(0.5, 'rgba(248, 237, 237, 0.95)');
      baseGradient.addColorStop(1, 'rgba(23, 59, 69, 0.1)');
      
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Configurar blend mode para efectos iOS 18
      ctx.globalCompositeOperation = 'multiply';
      
      // Animar y dibujar cada blob
      blobs.forEach((blob, index) => {
        // Movimiento suave
        blob.x += Math.sin(time * blob.speedX + index) * 0.00001;
        blob.y += Math.cos(time * blob.speedY + index) * 0.00001;
        
        // Mantener blobs en pantalla con rebote suave
        if (blob.x < 0.1 || blob.x > 0.9) blob.speedX *= -1;
        if (blob.y < 0.1 || blob.y > 0.9) blob.speedY *= -1;
        
        // Pulsación del tamaño
        const pulse = Math.sin(time * blob.pulseSpeed + index * Math.PI) * 0.1 + 1;
        const currentRadius = blob.radius * pulse;
        
        // Posición en píxeles
        const x = blob.x * canvas.width;
        const y = blob.y * canvas.height;
        const radius = currentRadius * Math.min(canvas.width, canvas.height);
        
        // Crear y aplicar gradiente radial
        const gradient = createRadialGradient(x, y, radius, blob.color, blob.opacity);
        ctx.fillStyle = gradient;
        
        // Dibujar blob con forma orgánica
        ctx.beginPath();
        
        // Crear forma orgánica con múltiples puntos de control
        const points = 8;
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const noise = Math.sin(time * 0.5 + angle * 3 + index) * 0.1 + 1;
          const r = radius * noise;
          const px = x + Math.cos(angle) * r;
          const py = y + Math.sin(angle) * r;
          
          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            // Usar curvas bezier para suavizar
            const prevAngle = ((i - 1) / points) * Math.PI * 2;
            const prevNoise = Math.sin(time * 0.5 + prevAngle * 3 + index) * 0.1 + 1;
            const prevR = radius * prevNoise;
            const prevPx = x + Math.cos(prevAngle) * prevR;
            const prevPy = y + Math.sin(prevAngle) * prevR;
            
            const cpx = (prevPx + px) / 2;
            const cpy = (prevPy + py) / 2;
            
            ctx.quadraticCurveTo(cpx, cpy, px, py);
          }
        }
        
        ctx.closePath();
        ctx.fill();
      });
      
      // Restaurar blend mode
      ctx.globalCompositeOperation = 'source-over';
      
      // Overlay sutil para unificar colores (efecto iOS 18)
      const overlayGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      overlayGradient.addColorStop(0, 'rgba(248, 237, 237, 0.1)');
      overlayGradient.addColorStop(0.5, 'rgba(255, 130, 37, 0.05)');
      overlayGradient.addColorStop(1, 'rgba(23, 59, 69, 0.1)');
      
      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
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
      {/* Canvas principal */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{
          background: 'linear-gradient(135deg, #F8EDED 0%, rgba(255, 130, 37, 0.1) 50%, rgba(23, 59, 69, 0.05) 100%)',
          filter: 'blur(0.5px)' // Suavizado sutil estilo iOS
        }}
      />

      {/* Efectos adicionales estilo iOS 18 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Resplandor superior */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-cream/20 to-transparent" />
        
        {/* Resplandor inferior */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-navy/10 to-transparent" />
        
        {/* Partículas flotantes muy sutiles */}
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-orange/30 animate-float opacity-20"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 35}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + i * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Overlay final con efecto de cristal */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent backdrop-blur-[0.5px]" />
    </div>
  );
};