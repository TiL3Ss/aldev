// app/components/sections/TechStackSection.tsx
'use client';

import { Card, CardBody, Chip, Progress } from '@heroui/react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Database, 
  Cloud, 
  Shield, 
  BarChart3, 
  Zap,
  Code2,
  GitBranch
} from 'lucide-react';

interface TechStackSectionProps {
  className?: string;
}

interface TechCategory {
  icon: React.ElementType;
  title: string;
  description: string;
  technologies: {
    name: string;
    level: number;
    color: 'orange' | 'burgundy' | 'navy';
  }[];
}

const techCategories: TechCategory[] = [
  {
    icon: Server,
    title: 'Backend & APIs',
    description: 'Desarrollo de servicios robustos y escalables',
    technologies: [
      { name: 'Node.js', level: 95, color: 'orange' },
      { name: 'Next.js API Routes', level: 90, color: 'burgundy' },
      { name: 'Express.js', level: 88, color: 'navy' },
      { name: 'TypeScript', level: 92, color: 'orange' },
    ]
  },
  {
    icon: Database,
    title: 'Bases de Datos',
    description: 'Gestión y optimización de datos',
    technologies: [
      { name: 'PostgreSQL', level: 85, color: 'burgundy' },
      { name: 'MongoDB', level: 88, color: 'orange' },
      { name: 'Redis', level: 80, color: 'navy' },
      { name: 'Prisma ORM', level: 85, color: 'orange' },
    ]
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud',
    description: 'Despliegue y infraestructura moderna',
    technologies: [
      { name: 'Docker', level: 85, color: 'navy' },
      { name: 'AWS', level: 80, color: 'burgundy' },
      { name: 'Vercel', level: 90, color: 'orange' },
      { name: 'GitHub Actions', level: 82, color: 'navy' },
    ]
  },
  {
    icon: Shield,
    title: 'Seguridad',
    description: 'Protección y autenticación robusta',
    technologies: [
      { name: 'JWT', level: 90, color: 'orange' },
      { name: 'OAuth 2.0', level: 85, color: 'burgundy' },
      { name: 'Bcrypt', level: 88, color: 'navy' },
      { name: 'CORS & CSRF', level: 85, color: 'orange' },
    ]
  },
  {
    icon: BarChart3,
    title: 'Monitoreo',
    description: 'Observabilidad y análisis de performance',
    technologies: [
      { name: 'Winston Logging', level: 82, color: 'burgundy' },
      { name: 'Prometheus', level: 75, color: 'navy' },
      { name: 'New Relic', level: 78, color: 'orange' },
      { name: 'Sentry', level: 85, color: 'burgundy' },
    ]
  },
  {
    icon: Code2,
    title: 'Herramientas',
    description: 'Desarrollo y productividad',
    technologies: [
      { name: 'VS Code', level: 95, color: 'orange' },
      { name: 'Postman', level: 90, color: 'burgundy' },
      { name: 'ESLint/Prettier', level: 88, color: 'navy' },
      { name: 'Jest/Testing', level: 85, color: 'orange' },
    ]
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const getColorClasses = (color: 'orange' | 'burgundy' | 'navy') => {
  const colors = {
    orange: {
      bg: 'bg-orange/20',
      text: 'text-orange',
      border: 'border-orange/30',
      gradient: 'from-orange/20 to-orange/5'
    },
    burgundy: {
      bg: 'bg-burgundy/20',
      text: 'text-burgundy',
      border: 'border-burgundy/30',
      gradient: 'from-burgundy/20 to-burgundy/5'
    },
    navy: {
      bg: 'bg-navy/20',
      text: 'text-navy',
      border: 'border-navy/30',
      gradient: 'from-navy/20 to-navy/5'
    }
  };
  return colors[color];
};

export const TechStackSection: React.FC<TechStackSectionProps> = ({ className = '' }) => {
  return (
    <section 
      id="tech" 
      className={`py-20 px-4 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Chip 
            className="mb-4 bg-gradient-to-r from-orange/20 to-burgundy/20 text-navy border-orange/30"
            variant="bordered"
            size="lg"
          >
            <Zap size={16} className="mr-2" />
            Stack Tecnológico
          </Chip>
          
          <h2 className="
            text-4xl md:text-5xl font-bold mb-6
            bg-gradient-to-r from-navy via-burgundy to-orange 
            bg-clip-text text-transparent
          ">
            Tecnologías que Domino
          </h2>
          
          <p className="text-xl text-navy/70 max-w-3xl mx-auto leading-relaxed">
            Un arsenal completo de herramientas modernas para crear soluciones 
            robustas, escalables y de alta calidad. Cada tecnología elegida estratégicamente 
            para maximizar el rendimiento y la eficiencia.
          </p>
        </motion.div>

        {/* Tech Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {techCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="
                h-full bg-cream/30 backdrop-blur-xl border border-orange/20
                hover:border-orange/40 hover:shadow-lg hover:shadow-orange/10
                transition-all duration-300 hover:-translate-y-1
                group
              ">
                <CardBody className="p-6">
                  {/* Category Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="
                      p-3 rounded-xl bg-gradient-to-br from-orange/20 to-burgundy/20
                      backdrop-blur-xl border border-orange/30
                      group-hover:scale-110 transition-transform duration-300
                    ">
                      <category.icon 
                        size={24} 
                        className="text-navy group-hover:text-orange transition-colors duration-300" 
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-orange transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-sm text-navy/60 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Technologies List */}
                  <div className="space-y-4">
                    {category.technologies.map((tech) => {
                      const colorClasses = getColorClasses(tech.color);
                      
                      return (
                        <div key={tech.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-navy">
                              {tech.name}
                            </span>
                            <span className={`text-xs font-bold ${colorClasses.text}`}>
                              {tech.level}%
                            </span>
                          </div>
                          
                          <div className="relative">
                            <div className="w-full bg-cream/40 rounded-full h-2 overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${colorClasses.gradient} ${colorClasses.bg} rounded-full`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${tech.level}%` }}
                                viewport={{ once: true }}
                                transition={{ 
                                  duration: 1.2, 
                                  delay: 0.2 + (index * 0.1),
                                  ease: "easeInOut" 
                                }}
                              />
                            </div>
                            
                            {/* Progress glow effect */}
                            <motion.div
                              className={`absolute top-0 left-0 h-full bg-gradient-to-r ${colorClasses.gradient} rounded-full opacity-0`}
                              initial={{ width: 0, opacity: 0 }}
                              whileInView={{ 
                                width: `${tech.level}%`, 
                                opacity: [0, 0.6, 0] 
                              }}
                              viewport={{ once: true }}
                              transition={{ 
                                duration: 1.5, 
                                delay: 0.2 + (index * 0.1),
                                ease: "easeInOut" 
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="
            bg-gradient-to-r from-orange/5 via-burgundy/5 to-navy/5
            backdrop-blur-xl border border-orange/20
          ">
            <CardBody className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-navy mb-2">
                  Experiencia en Números
                </h3>
                <p className="text-navy/60">
                  Métricas que reflejan mi pasión por la tecnología
                </p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  {
                    number: "5+",
                    label: "Años de Experiencia",
                    description: "Desarrollando soluciones backend",
                    color: "orange"
                  },
                  {
                    number: "50+",
                    label: "Proyectos Completados",
                    description: "APIs y sistemas robustos",
                    color: "burgundy"
                  },
                  {
                    number: "15+",
                    label: "Tecnologías Dominadas",
                    description: "Stack completo moderno",
                    color: "navy"
                  },
                  {
                    number: "24/7",
                    label: "Disponibilidad",
                    description: "Para consultoría y soporte",
                    color: "orange"
                  }
                ].map((stat, index) => {
                  const colorClasses = getColorClasses(stat.color as 'orange' | 'burgundy' | 'navy');
                  
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="text-center group"
                    >
                      <div className={`
                        text-4xl md:text-5xl font-bold mb-2 ${colorClasses.text}
                        group-hover:scale-110 transition-transform duration-300
                      `}>
                        {stat.number}
                      </div>
                      <div className="text-lg font-semibold text-navy mb-1">
                        {stat.label}
                      </div>
                      <div className="text-sm text-navy/60">
                        {stat.description}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="
            bg-cream/20 backdrop-blur-xl border border-orange/20
          ">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <GitBranch size={24} className="text-orange" />
                <h4 className="text-xl font-bold text-navy">
                  Metodología y Mejores Prácticas
                </h4>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="
                    w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange/20 to-burgundy/20
                    backdrop-blur-xl border border-orange/30 flex items-center justify-center
                  ">
                    <Code2 size={24} className="text-navy" />
                  </div>
                  <h5 className="font-semibold text-navy mb-2">Clean Code</h5>
                  <p className="text-sm text-navy/60 leading-relaxed">
                    Código legible, mantenible y bien documentado siguiendo los principios SOLID
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="
                    w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-burgundy/20 to-navy/20
                    backdrop-blur-xl border border-burgundy/30 flex items-center justify-center
                  ">
                    <Shield size={24} className="text-navy" />
                  </div>
                  <h5 className="font-semibold text-navy mb-2">Security First</h5>
                  <p className="text-sm text-navy/60 leading-relaxed">
                    Implementación de las mejores prácticas de seguridad desde el diseño
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="
                    w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-navy/20 to-orange/20
                    backdrop-blur-xl border border-navy/30 flex items-center justify-center
                  ">
                    <Zap size={24} className="text-navy" />
                  </div>
                  <h5 className="font-semibold text-navy mb-2">Performance</h5>
                  <p className="text-sm text-navy/60 leading-relaxed">
                    Optimización constante para máximo rendimiento y escalabilidad
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};