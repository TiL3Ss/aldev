// app/components/layout/Footer.tsx
'use client';

import { Link, Chip } from '@heroui/react';
import { Heart, Code, Coffee, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

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
        bg-gradient-to-t from-gray-50/80 via-white/60 to-transparent 
        dark:from-gray-900/80 dark:via-black/60 dark:to-transparent
        backdrop-blur-3xl border-t border-black/5 dark:border-white/10
        py-16 px-4 relative overflow-hidden
        ${className}
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <motion.h3 
              className="
                text-3xl font-black mb-4 tracking-tight
                bg-gradient-to-r from-red-600 via-red-500 to-orange
                bg-clip-text text-transparent
              "
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Alvaro
            </motion.h3>
            <p className="
              text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-md text-lg
            ">
              Software Developer especializado en crear soluciones técnicas
              eficaces y escalables. Transformando ideas en código de calidad.
            </p>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="
                flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm
                bg-white/60 dark:bg-black/40 backdrop-blur-xl 
                border border-gray-200/50 dark:border-gray-600/50
                rounded-2xl p-4 max-w-fit
              "
            >
              <span>Hecho con</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Coffee size={16} className="text-red-500" />
              </motion.div>
              <span>usando</span>
              <Code size={16} className="text-red-500" />
              <span>y más</span>
              <Coffee size={16} className="text-amber-600" />
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">
              Navegación
            </h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={e => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="
                      text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400
                      transition-all duration-300 text-sm font-medium
                      hover:translate-x-1 block py-1
                    "
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">
              Conectar
            </h4>
            <div className="space-y-3">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  whileHover={{ x: 4 }}
                >
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400
                      transition-all duration-300 text-sm font-medium
                      block py-1
                    "
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="
            h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent 
            mb-8 origin-center
          "
        />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="
            flex flex-col lg:flex-row justify-between items-center
            gap-6 lg:gap-4
          "
        >
          <div className="
            text-gray-500 dark:text-gray-400 text-sm font-medium
            order-2 lg:order-1
          ">
            © {currentYear} Alvchdev. Todos los derechos reservados.
          </div>

          <div className="
            flex flex-col sm:flex-row items-center gap-4
            order-1 lg:order-2
          ">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Chip 
                className="
              flex items-center gap-2 text-green-600 dark:text-green-500 text-sm
              bg-white/60 dark:bg-black/40 backdrop-blur-xl 
              border border-gray-200/50 dark:border-gray-600/50
              rounded-2xl px-4 py-2
            "
                variant="bordered"
                size="sm"
                startContent={
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-2 h-2 rounded-full bg-green-500"
                  />
                }
              >
                Disponible para proyectos
              </Chip>
            </motion.div>
            
            <div className="
              flex items-center gap-2 text-orange dark:text-orange-light text-sm
              bg-white/60 dark:bg-black/40 backdrop-blur-xl 
              border border-gray-200/50 dark:border-gray-600/50
              rounded-2xl px-4 py-2
            ">
              <MapPin size={14} />
              <span className="font-medium">Puerto Aysén, Chile 🇨🇱</span>
            </div>
          </div>
        </motion.div>

        {/* Additional Info Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="
            mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50
            flex flex-col sm:flex-row justify-center items-center gap-4
          "
        >
          <div className="
             text-orange dark:text-orange-light text-xs font-medium
            bg-white/40 dark:bg-black/20 backdrop-blur-xl 
            border border-orange/30 dark:border-orange-light/30
            rounded-full px-4 py-2
          ">
            <Clock size={12} />
            <span>Tiempo de respuesta: &lt; 24h</span>
          </div>
          <div className="
            text-orange dark:text-orange-light text-xs font-medium
            bg-white/40 dark:bg-black/20 backdrop-blur-xl 
            border border-orange/30 dark:border-orange-light/30
            rounded-full px-4 py-2
          ">
            GMT-3 • Trabajo 100% remoto
          </div>
        </motion.div>
      </div>
    </footer>
  );
};