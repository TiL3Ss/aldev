// app/components/sections/TechStackSection.tsx
'use client';

import { Card, CardBody, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Database, 
  Cloud, 
  Shield, 
  Code, 
  Zap,
  Code2,
  GitBranch,
  Wrench,
} from 'lucide-react';

// Importar los iconos personalizados
import {
  Postman,
  VisualStudioCode,
  ESLint,
  Dart,
  Php,
  C,
  TypeScript,
  JavaScript,
  Auth0,
  Docker,
  GoogleCloud,
  Vercel,
  MySQL,
  MongoDB,
  SQLite,
  Firebase,
  Nodejs,
  Nextjs,
} from '../icons/tech'; 

interface TechStackSectionProps {
  className?: string;
}

interface TechCategory {
  icon: React.ElementType;
  title: string;
  description: string;
  technologies: {
    name: string;
    icon: React.ElementType;
    color: 'orange' | 'burgundy' | 'navy';
  }[];
}

const techCategories: TechCategory[] = [
  {
    icon: Server,
    title: 'Backend & APIs',
    description: 'Desarrollo de servicios robustos y escalables',
    technologies: [
      { name: 'Node.js', icon: Nodejs, color: 'orange' },
      { name: 'Next.js', icon: Nextjs, color: 'burgundy' },
      { name: 'PHP', icon: Php, color: 'navy' },
      { name: 'TypeScript', icon: TypeScript, color: 'orange' },
    ]
  },
  {
    icon: Database,
    title: 'Bases de Datos',
    description: 'Gestión y optimización de datos',
    technologies: [
      { name: 'MySQL', icon: MySQL, color: 'burgundy' },
      { name: 'MongoDB', icon: MongoDB, color: 'orange' },
      { name: 'SQLite', icon: SQLite, color: 'navy' },
      { name: 'Firebase', icon: Firebase, color: 'orange' },
    ]
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud',
    description: 'Despliegue y infraestructura moderna',
    technologies: [
      { name: 'Docker', icon: Docker, color: 'navy' },
      { name: 'GCP', icon: GoogleCloud, color: 'burgundy' },
      { name: 'Vercel', icon: Vercel, color: 'orange' },
      { name: 'GitHub Actions', icon: GitBranch, color: 'navy' }, // Mantenemos GitBranch de Lucide
    ]
  },
  {
    icon: Shield,
    title: 'Seguridad',
    description: 'Protección y autenticación robusta',
    technologies: [
      { name: 'Auth0', icon: Auth0, color: 'burgundy' },
      { name: 'OAuth 2.0', icon: Shield, color: 'navy' }, // Mantenemos Shield de Lucide
    ]
  },
  {
    icon: Code,
    title: 'Lenguajes',
    description: 'Dominio de múltiples lenguajes de programación',
    technologies: [
      { name: 'JavaScript', icon: JavaScript, color: 'burgundy' },
      { name: 'TypeScript', icon: TypeScript, color: 'navy' },
      { name: 'PHP', icon: Php, color: 'orange' },
      { name: 'C#', icon: C, color: 'burgundy' },
      { name: 'Dart', icon: Dart, color: 'orange' },
    ]
  },
  {
    icon: Wrench,
    title: 'Herramientas',
    description: 'Desarrollo y productividad',
    technologies: [
      { name: 'VS Code', icon: VisualStudioCode, color: 'orange' },
      { name: 'Postman', icon: Postman, color: 'burgundy' },
      { name: 'ESLint', icon: ESLint, color: 'navy' },
      { name: 'Planner', icon: Code2, color: 'orange' }, // Mantenemos Code2 de Lucide para Planner
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
      bg: 'bg-orange/15',
      text: 'text-orange',
      border: 'border-orange/25',
      gradient: 'from-orange/15 to-orange/8',
      chip: 'bg-orange/10 text-orange-700 border-orange/20'
    },
    burgundy: {
      bg: 'bg-burgundy/15',
      text: 'text-burgundy',
      border: 'border-burgundy/25',
      gradient: 'from-burgundy/15 to-burgundy/8',
      chip: 'bg-burgundy/10 text-burgundy-700 border-burgundy/20'
    },
    navy: {
      bg: 'bg-navy/15',
      text: 'text-navy',
      border: 'border-navy/25',
      gradient: 'from-navy/15 to-navy/8',
      chip: 'bg-navy/10 text-navy-700 border-navy/20'
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
            className="
              mb-4 bg-gradient-to-r from-orange/15 to-burgundy/15 
              text-navy border-orange/25 rounded-full px-6 py-3
              backdrop-blur-xl shadow-lg shadow-orange/5
              flex items-center gap-2
            "
            variant="bordered"
            size="lg"
          >
            <Zap size={16} className="shrink-0" />
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
                h-full bg-white/80 backdrop-blur-xl border border-orange/20
                hover:border-orange/40 hover:shadow-xl hover:shadow-orange/10
                transition-all duration-500 hover:-translate-y-2
                group rounded-3xl overflow-hidden
                hover:bg-white/90
              ">
                <CardBody className="p-8">
                  {/* Category Header */}
                  <div className="flex items-start gap-4 mb-8">
                    <div className="
                      p-4 rounded-2xl bg-gradient-to-br from-orange/15 to-burgundy/15
                      backdrop-blur-xl border border-orange/20 shadow-lg shadow-orange/5
                      group-hover:scale-110 transition-all duration-500
                      group-hover:shadow-xl group-hover:shadow-orange/10
                    ">
                      <category.icon 
                        size={28} 
                        className="text-navy group-hover:text-orange transition-colors duration-500" 
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-orange transition-colors duration-500">
                        {category.title}
                      </h3>
                      <p className="text-sm text-navy/60 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Technologies Container - Distribución flexible */}
                  <div className="relative">
                    {/* Grid adaptativo que se reorganiza en hover */}
                    <div className="
                      flex flex-wrap gap-2 
                      group-hover:grid group-hover:grid-cols-2 group-hover:gap-4
                      transition-all duration-500 ease-in-out
                    ">
                      {category.technologies.map((tech, techIndex) => {
                        const colorClasses = getColorClasses(tech.color);
                        
                        return (
                          <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: (index * 0.1) + (techIndex * 0.05) }}
                            className="
                              group/tech relative flex-shrink-0
                              group-hover:flex-shrink group-hover:w-full
                              transition-all duration-500 ease-in-out
                            "
                          >
                            {/* Contenedor expandible - Compacto por defecto */}
                            <motion.div
                              className={`
                                flex items-center rounded-2xl cursor-pointer relative
                                ${colorClasses.bg} ${colorClasses.border} border backdrop-blur-xl
                                hover:shadow-lg hover:shadow-current/20
                                transition-all duration-300
                              `}
                              initial={{ width: 40, height: 40 }}
                              animate={{ 
                                width: 40, 
                                height: 40,
                                paddingRight: 0
                              }}
                              whileHover={{ 
                                width: "100%",
                                paddingRight: "0.75rem",
                                zIndex: 10
                              }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 300, 
                                damping: 25,
                                duration: 0.4 
                              }}
                            >
                              {/* Icon Container - Más compacto */}
                              <div className={`
                                w-10 h-10 flex items-center justify-center flex-shrink-0
                                transition-all duration-300 relative overflow-hidden
                              `}>
                                <tech.icon 
                                  className={`w-4 h-4 ${colorClasses.text} transition-all duration-300
                                    group-hover/tech:w-5 group-hover/tech:h-5
                                  `}
                                  style={{ 
                                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' 
                                  }}
                                />
                                
                                {/* Shimmer effect */}
                                <div className="
                                  absolute inset-0 -translate-x-full
                                  bg-gradient-to-r from-transparent via-white/20 to-transparent
                                  group-hover/tech:translate-x-full transition-transform duration-1000
                                " />
                              </div>

                              {/* Text - Solo visible en hover individual */}
                              <div className="
                                w-0 group-hover/tech:w-auto
                                opacity-0 group-hover/tech:opacity-100
                                ml-0 group-hover/tech:ml-3
                                transition-all duration-300 ease-out
                                whitespace-nowrap overflow-hidden
                              ">
                                <span className={`text-sm font-semibold ${colorClasses.text}`}>
                                  {tech.name}
                                </span>
                              </div>
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </div>
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
            bg-white/70 backdrop-blur-xl border border-orange/20 rounded-3xl
            shadow-xl shadow-orange/5
          ">
            <CardBody className="p-10">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-navy mb-3">
                  Experiencia en Números
                </h3>
                <p className="text-navy/60">
                  Métricas que reflejan mi pasión por la tecnología
                </p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  {
                    number: "3+",
                    label: "Años de Experiencia",
                    description: "Desarrollando Software y APIs",
                    color: "orange"
                  },
                  {
                    number: "15+",
                    label: "Proyectos Completados",
                    description: "APIs y sistemas robustos",
                    color: "burgundy"
                  },
                  {
                    number: "5+",
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
                        text-4xl md:text-5xl font-bold mb-3 ${colorClasses.text}
                        group-hover:scale-110 transition-transform duration-500
                      `}>
                        {stat.number}
                      </div>
                      <div className="text-lg font-semibold text-navy mb-2">
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
            bg-white/70 backdrop-blur-xl border border-orange/20 rounded-3xl
            shadow-xl shadow-orange/5
          ">
            <CardBody className="p-10">
              <div className="flex items-center gap-3 mb-8">
                <GitBranch size={28} className="text-orange" />
                <h4 className="text-xl font-bold text-navy">
                  Metodología y Mejores Prácticas
                </h4>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="
                    w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-orange/15 to-burgundy/15
                    backdrop-blur-xl border border-orange/20 flex items-center justify-center
                    shadow-lg shadow-orange/5 group-hover:scale-110 transition-all duration-500
                    group-hover:shadow-xl group-hover:shadow-orange/10
                  ">
                    <Code2 size={28} className="text-navy group-hover:text-orange transition-colors duration-500" />
                  </div>
                  <h5 className="font-semibold text-navy mb-3 text-lg">Código Limpio</h5>
                  <p className="text-sm text-navy/60 leading-relaxed">
                    Código legible, mantenible y bien documentado siguiendo los principios SOLID
                  </p>
                </div>
                
                <div className="text-center group">
                  <div className="
                    w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-burgundy/15 to-navy/15
                    backdrop-blur-xl border border-burgundy/20 flex items-center justify-center
                    shadow-lg shadow-burgundy/5 group-hover:scale-110 transition-all duration-500
                    group-hover:shadow-xl group-hover:shadow-burgundy/10
                  ">
                    <Shield size={28} className="text-navy group-hover:text-burgundy transition-colors duration-500" />
                  </div>
                  <h5 className="font-semibold text-navy mb-3 text-lg">Prioridad de Seguridad</h5>
                  <p className="text-sm text-navy/60 leading-relaxed">
                    Implementación de las mejores prácticas de seguridad desde el diseño
                  </p>
                </div>
                
                <div className="text-center group">
                  <div className="
                    w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-navy/15 to-orange/15
                    backdrop-blur-xl border border-navy/20 flex items-center justify-center
                    shadow-lg shadow-navy/5 group-hover:scale-110 transition-all duration-500
                    group-hover:shadow-xl group-hover:shadow-navy/10
                  ">
                    <Zap size={28} className="text-navy group-hover:text-navy transition-colors duration-500" />
                  </div>
                  <h5 className="font-semibold text-navy mb-3 text-lg">Rendimiento</h5>
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