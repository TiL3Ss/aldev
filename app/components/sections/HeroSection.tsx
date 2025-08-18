// app/components/sections/HeroSection.tsx
'use client';

import { Button, Card, CardBody, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

interface HeroSectionProps {
  className?: string;
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/TiL3Ss', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/tu-perfil', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:tu@email.com', label: 'Email' },
];

const specialties = [
  'APIs RESTful',
  'Microservicios',
  'Node.js & Next.js',
  'Bases de Datos',
  'DevOps',
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
      className={`min-h-screen flex items-center justify-center px-4 py-20 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <Card className="
          bg-cream/20 backdrop-blur-xl border border-orange/20 
          shadow-2xl shadow-navy/5
        ">
          <CardBody className="p-8 md:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Greeting */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Chip 
                    className="mb-4 bg-gradient-to-r from-orange/20 to-burgundy/20 text-navy border-orange/30"
                    variant="bordered"
                    size="lg"
                  >
                    👋 Hola, soy Alexander
                  </Chip>
                </motion.div>

                {/* Main Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h1 className="
                    text-4xl md:text-6xl lg:text-7xl font-bold 
                    bg-gradient-to-r from-navy via-burgundy to-orange 
                    bg-clip-text text-transparent
                    leading-tight
                  ">
                    Backend
                    <br />
                    Developer
                  </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="
                    text-xl md:text-2xl text-burgundy/80 font-medium 
                    leading-relaxed max-w-lg
                  "
                >
                  Creando arquitecturas robustas y escalables que impulsan 
                  el crecimiento digital
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-navy/70 text-lg leading-relaxed max-w-lg"
                >
                  Especialista en desarrollo backend con enfoque en 
                  performance, seguridad y mejores prácticas. 
                  Transformo ideas complejas en soluciones técnicas elegantes.
                </motion.p>

                {/* Specialties */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="flex flex-wrap gap-2"
                >
                  {specialties.map((specialty, index) => (
                    <Chip
                      key={specialty}
                      className="bg-orange/10 text-navy border-orange/20"
                      variant="bordered"
                      size="sm"
                    >
                      {specialty}
                    </Chip>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    size="lg"
                    radius="full"
                    className="
                      bg-gradient-to-r from-orange to-burgundy text-white
                      hover:shadow-lg hover:shadow-orange/25
                      transition-all duration-300 hover:-translate-y-0.5
                      font-semibold px-8
                    "
                    onPress={() => {
                      const projectsSection = document.getElementById('projects');
                      if (projectsSection) {
                        projectsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Ver Proyectos
                  </Button>
                  
                  <Button
                    size="lg"
                    radius="full"
                    variant="bordered"
                    className="
                      border-2 border-navy text-navy hover:bg-navy hover:text-cream
                      transition-all duration-300 hover:-translate-y-0.5
                      font-semibold px-8
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
                  transition={{ delay: 1.4 }}
                  className="flex gap-4"
                >
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <Button
                      key={label}
                      as="a"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      isIconOnly
                      variant="light"
                      className="
                        text-navy hover:text-orange hover:bg-orange/10
                        transition-all duration-300 hover:-translate-y-0.5
                      "
                      aria-label={label}
                    >
                      <Icon size={24} />
                    </Button>
                  ))}
                </motion.div>
              </motion.div>

              {/* Visual Element */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hidden lg:flex justify-center items-center"
              >
                <div className="relative">
                  {/* Main Circle */}
                  <div className="
                    w-80 h-80 rounded-full 
                    bg-gradient-to-br from-orange/20 via-burgundy/20 to-navy/20
                    backdrop-blur-xl border border-orange/30
                    flex items-center justify-center
                    shadow-2xl shadow-navy/10
                  ">
                    {/* Inner Content */}
                    <div className="
                      w-64 h-64 rounded-full 
                      bg-gradient-to-br from-cream/40 to-orange/20
                      backdrop-blur-xl border border-orange/20
                      flex items-center justify-center
                    ">
                      <div className="text-center">
                        <div className="text-6xl mb-4">⚡</div>
                        <div className="text-navy font-bold text-xl">Backend</div>
                        <div className="text-burgundy font-medium">Excellence</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <div className="
                      absolute -top-4 left-1/2 -translate-x-1/2
                      w-12 h-12 rounded-full bg-orange/30 backdrop-blur-xl
                      flex items-center justify-center text-2xl
                    ">
                      🚀
                    </div>
                    <div className="
                      absolute top-1/2 -right-4 -translate-y-1/2
                      w-12 h-12 rounded-full bg-burgundy/30 backdrop-blur-xl
                      flex items-center justify-center text-2xl
                    ">
                      ⚙️
                    </div>
                    <div className="
                      absolute -bottom-4 left-1/2 -translate-x-1/2
                      w-12 h-12 rounded-full bg-navy/30 backdrop-blur-xl
                      flex items-center justify-center text-2xl
                    ">
                      🔧
                    </div>
                    <div className="
                      absolute top-1/2 -left-4 -translate-y-1/2
                      w-12 h-12 rounded-full bg-cream/40 backdrop-blur-xl border border-orange/20
                      flex items-center justify-center text-2xl
                    ">
                      💡
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </CardBody>
        </Card>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex justify-center mt-12"
        >
          <Button
            isIconOnly
            variant="light"
            className="
              text-navy hover:text-orange
              animate-bounce hover:animate-none
              transition-all duration-300
            "
            onPress={scrollToNext}
            aria-label="Scroll to next section"
          >
            <ArrowDown size={24} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};