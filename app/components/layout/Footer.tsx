// app/components/layout/Footer.tsx
'use client';

import { Link, Chip } from '@heroui/react';
import { Heart, Code, Coffee } from 'lucide-react';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Inicio', href: '#home' },
    { label: 'Tecnologías', href: '#tech' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Contacto', href: '#contact' }
  ];

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/TiL3Ss' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/tu-perfil' },
    { label: 'Twitter', href: 'https://twitter.com/tu-handle' },
    { label: 'Email', href: 'mailto:tu@email.com' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <footer
      className={`
      bg-gradient-to-t from-cream/80 to-transparent 
      backdrop-blur-xl border-t border-orange/20
      py-12 px-4
      ${className}
    `}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-navy mb-4">Alexander</h3>
            <p className="text-navy/70 mb-6 leading-relaxed max-w-md">
              Backend Developer especializado en crear soluciones técnicas
              robustas y escalables. Transformando ideas en código de calidad.
            </p>

            <div className="flex items-center gap-2 text-burgundy/80 text-sm">
              <span>Hecho con</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>usando</span>
              <Code size={16} />
              <span>y mucho</span>
              <Coffee size={16} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-navy mb-4">Navegación</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={e => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="
                      text-navy/70 hover:text-orange 
                      transition-colors duration-300
                      text-sm
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-navy mb-4">Conectar</h4>
            <ul className="space-y-2">
              {socialLinks.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      text-navy/70 hover:text-orange 
                      transition-colors duration-300
                      text-sm
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="
          mt-12 pt-8 border-t border-orange/20
          flex flex-col sm:flex-row justify-between items-center
          gap-4
        "
        >
          <div className="text-navy/60 text-sm">
            © {currentYear} Alexander. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-4">
            <Chip size="sm" variant="flat" className="bg-orange/10 text-navy">
              Disponible para proyectos
            </Chip>
            <div className="text-navy/60 text-sm">Puerto Aysén, Chile 🇨🇱</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
