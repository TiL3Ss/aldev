// app/components/sections/HeroSection.tsx
'use client';

import { Button, Card, CardBody, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  className?: string;
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/TiL3Ss', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/alvaro-chavez-melo-35392b338/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:alvchdev@gmail.com', label: 'Email' },
];

const specialties = [
  'APIs RESTful',
  'Optimización de Procesos',
  'Node.js & Next.js',
  'Bases de Datos',
  'Implemetaciones',
];

export const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  const scrollToNext = () => {
    const techSection = document.getElementById('tech');
    if (techSection) {
      techSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className={`
        min-h-screen flex items-center justify-center px-4 py-20 
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto w-full">
        <Card className="
          bg-white/60 dark:bg-black/40 backdrop-blur-3xl 
          border border-black/5 dark:border-white/10
          shadow-2xl shadow-black/5 dark:shadow-white/10
          hover:shadow-3xl hover:shadow-black/10 dark:hover:shadow-white/20
          transition-all duration-700 ease-out
          rounded-3xl overflow-hidden
        ">
          <CardBody className="p-0">
            <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="p-8 md:p-16 flex flex-col justify-center space-y-8"
              >
                {/* Greeting */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Chip 
                    className="
                      mb-6 bg-gradient-to-r from-red-500/20 to-red-600/20 
                      text-gray-800 dark:text-gray-200 border border-red-200/30 dark:border-orange-light/30
                      backdrop-blur-xl px-4 py-2
                    "
                    variant="bordered"
                    size="lg"
                    startContent={<span className="text-xl">👋</span>}
                  >
                    <span className="font-semibold">Hola, soy Alvaro</span>
                  </Chip>
                </motion.div>

                {/* Main Title */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <h1 className="
                    text-5xl md:text-7xl lg:text-8xl font-black
                    bg-gradient-to-r from-red-600 via-orange to-red-500 
                    bg-clip-text text-transparent
                    leading-[0.9] tracking-tight mb-4
                  ">
                    Software
                    <br />
                    <span className="font-light italic">Developer</span>
                  </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="
                    text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium 
                    leading-relaxed max-w-lg
                  "
                >
                  Diseñando proyectos eficientes y escalables para impulsar
                  el crecimiento digital
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-lg"
                >
                  Especialista en desarrollo backend con enfoque en 
                  performance, seguridad y mejores prácticas. 
                  Transformo ideas en soluciones practicas.
                </motion.p>

                {/* Specialties */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="flex flex-wrap gap-3"
                >
                  {specialties.map((specialty, index) => (
                    <motion.div
                      key={specialty}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                    >
                      <Chip
                        className="
                          bg-white/70 dark:bg-black/50 text-gray-700 dark:text-gray-300 
                          border border-gray-200/50 dark:border-gray-600/50
                          backdrop-blur-xl hover:bg-red-50/70 dark:hover:bg-red-950/50
                          transition-all duration-300 hover:scale-105
                        "
                        variant="bordered"
                        size="md"
                      >
                        {specialty}
                      </Chip>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <Button
                    size="lg"
                    radius="full"
                    className="
                      bg-gradient-to-r from-red-500 to-orange text-white
                      hover:shadow-xl hover:shadow-red-500/30
                      transition-all duration-300 hover:scale-105
                      font-semibold px-8 h-14 text-base
                      border-0 backdrop-blur-xl
                    "
                    onPress={() => {
                      const projectsSection = document.getElementById('projects');
                      if (projectsSection) {
                        projectsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    startContent={<Sparkles size={20} />}
                  >
                    Ver Proyectos
                  </Button>
                  
                  <Button
                    size="lg"
                    radius="full"
                    className="
                      bg-white/70 dark:bg-black/50 text-gray-800 dark:text-gray-200
                      border border-gray-200/50 dark:border-gray-600/50
                      hover:bg-red-700 dark:hover:bg-orange-light
                      transition-all duration-300 hover:scale-105 backdrop-blur-xl
                      font-semibold px-8 h-14 text-base
                    "
                    onPress={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Hablemos
                  </Button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                  className="flex gap-3 pt-4"
                >
                  {socialLinks.map(({ icon: Icon, href, label }, index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.8 + index * 0.1, duration: 0.4 }}
                    >
                      <Button
                        as="a"
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        isIconOnly
                        className="
                          bg-white/70 dark:bg-black/50 text-gray-700 dark:text-gray-300
                          border border-gray-200/50 dark:border-gray-600/50
                          hover:bg-red-50/70 dark:hover:bg-red-950/50 hover:text-red-600 dark:hover:text-red-400
                          transition-all duration-300 hover:scale-110 backdrop-blur-xl
                          w-12 h-12 rounded-2xl
                        "
                        aria-label={label}
                      >
                        <Icon size={20} />
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Visual Element */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="
                  relative flex items-center justify-center p-8 lg:p-16
                  bg-gradient-to-br from-red-700/5 via-orange/5 to-red-500/5
                  dark:from-red-500/10 dark:via-orange-light/10 dark:to-orange-light/10
                "
              >
                <div className="relative">
                  {/* Main Orb */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="
                      w-80 h-80 rounded-full relative overflow-hidden
                      bg-gradient-to-br from-red-500/20 via-orange/30 to-red-500/20
                      backdrop-blur-3xl border border-white/20 dark:border-white/10
                      shadow-2xl shadow-red-500/20 dark:shadow-orange/30
                      flex items-center justify-center
                    "
                  >
                    {/* Inner Glow */}
                    <div className="
                      absolute inset-4 rounded-full
                      bg-gradient-to-br from-white/40 to-transparent
                      dark:from-white/20 dark:to-transparent
                      backdrop-blur-xl
                    " />
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="text-6xl mb-4 grayscale-0"
                      >
                        ⚡
                      </motion.div>
                      <div className="text-gray-800 dark:text-white font-bold text-xl tracking-wide">Backend</div>
                      <div className="text-orange dark:text-orange-light font-medium text-lg">Excellence</div>
                    </div>
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    {[
                      { emoji: '🚀', delay: 0, position: 'top' },
                      { emoji: '⚙️', delay: 0.25, position: 'right' },
                      { emoji: '🔧', delay: 0.5, position: 'bottom' },
                      { emoji: '💡', delay: 0.75, position: 'left' }
                    ].map(({ emoji, delay, position }, index) => (
                      <motion.div
                        key={position}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: delay + 2, duration: 0.6 }}
                        className={`
                          absolute w-14 h-14 rounded-2xl backdrop-blur-xl
                          bg-white/60 dark:bg-black/40 border border-white/30 dark:border-white/10
                          flex items-center justify-center text-2xl
                          shadow-lg shadow-black/5 dark:shadow-white/10
                          ${position === 'top' && '-top-6 left-1/2 -translate-x-1/2'}
                          ${position === 'right' && 'top-1/2 -right-6 -translate-y-1/2'}
                          ${position === 'bottom' && '-bottom-6 left-1/2 -translate-x-1/2'}
                          ${position === 'left' && 'top-1/2 -left-6 -translate-y-1/2'}
                        `}
                      >
                        <motion.span
                          animate={{ 
                            rotate: -360,
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, delay: delay }
                          }}
                        >
                          {emoji}
                        </motion.span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Background Decorative Elements */}
                  <div className="absolute inset-0 -z-10">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-10 right-10 w-20 h-20 rounded-full bg-red-500/20 blur-xl"
                    />
                    <motion.div
                      animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.6, 0.4]
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-orange/20 blur-xl"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </CardBody>
        </Card>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <motion.div
            animate={{ 
              y: [0, 8, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Button
            isIconOnly
            className="
              flex items-center justify-center
              bg-white/60 dark:bg-black/40 text-gray-700 dark:text-gray-300
              border border-gray-200/50 dark:border-gray-600/50
              hover:bg-gray-50/70 dark:hover:bg-gray-800/50 hover:scale-110
              transition-all duration-300 backdrop-blur-xl
              w-12 h-12 rounded-2xl
            "
            onPress={scrollToNext}
            aria-label="Scroll to next section"
          >
            <ArrowDown size={20} />
          </Button>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};