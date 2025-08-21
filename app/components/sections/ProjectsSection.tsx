// app/components/sections/ProjectsSection.tsx
'use client';

import { Button, Card, CardBody, CardHeader, Chip, Link } from '@heroui/react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Rocket, 
  Server, 
  Database, 
  Shield,
  BarChart3,
  Zap,
  CheckCircle2,
  Clock,
  FileText
} from 'lucide-react';
import React from 'react';

interface ProjectsSectionProps {
  className?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: React.ElementType;
  technologies: string[];
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'planning';
  category: 'api' | 'microservices' | 'fullstack' | 'tools';
}

const projects: Project[] = [
  {
    id: 'fitincho-app',
    title: 'FiTincho-app',
    description: "FiTincho - Fitness app.",
    longDescription: 'Aplicación web que permite a los usuarios crear y gestionar sus propias rutinas de entrenamiento. Incluye seguimiento del progreso con gráficos, un diseño moderno inspirado en iOS 18 con `glassmorphism`, un sistema de usuarios con perfiles y roles personalizados, y un panel de administración para la gestión completa del sistema.',
    icon: Server,
    technologies: ['Next.js 14', 'TypeScript', 'Turso/LibSQL', 'Vercel', 'Tailwind CSS'],
    features: [
      "Rutinas personalizadas",
      "Seguimiento del progreso con gráficos",
      "Diseño con 'glassmorphism'",
      "Usuarios con perfiles y roles",
      "Panel de administración"
    ],
    demoUrl: 'https://fi-tincho.vercel.app/',
    githubUrl: 'https://github.com/TiL3Ss/FiTincho',
    status: 'completed',
    category: 'fullstack'
  },
  {
    id: 'anidrive-social-app',
    title: 'Anidrive - Anime Social Network',
    description: 'Red social para mantener un registro de los animes que estás viendo.',
    longDescription: 'Una red social diseñada para entusiastas del anime, permitiendo a los usuarios mantener un seguimiento de sus series actuales, ver lo que otros están viendo, comentar reseñas, calificar animes y marcar el progreso de cada capítulo.',
    icon: Zap,
    technologies: ['Next.js 14', 'TypeScript', 'Turso/LibSQL', 'Vercel', 'Tailwind CSS'],
    features: [
        'Seguimiento de animes',
        'Ver lo que otros usuarios están viendo',
        'Comentarios y reseñas',
        'Calificación de animes',
        'Seguimiento de capítulos'
    ],
    demoUrl: 'https://anidrive.vercel.app/',
    githubUrl: 'https://github.com/TiL3Ss/Anidrive',
    status: 'in-progress',
    category: 'fullstack'
  },
  {
    id: 'moodle-attendance-api',
    title: 'Moodle Attendance API Plugin',
    description: 'API para la gestión de asistencia en la plataforma Moodle.',
    longDescription: 'API desarrollada como un plugin para la plataforma de aprendizaje Moodle, diseñada específicamente para gestionar la asistencia en cursos del SENCE (Servicio Nacional de Capacitación y Empleo). La API permite el manejo de la asistencia de los cursos administrados por la plataforma Moodle para la empresa CECADe Group.',
    icon: Database,
    technologies: [
      'PHP',
      'Moodle',
      'Postman'
    ],
    features: [
      'Gestión de asistencia de cursos',
      'Integración como plugin de Moodle',
      'Manejo de datos para cursos SENCE'
    ],
    demoUrl: 'null',
    githubUrl: 'null',
    status: 'completed',
    category: 'api'
  }
];

const statusConfig = {
  completed: { 
    label: 'Completado', 
    color: 'success' as const,
    icon: CheckCircle2,
    bgClass: 'bg-green-100 text-green-700 border-green-200',
    style: undefined
  },
  'in-progress': { 
    label: 'En Desarrollo', 
    color: 'warning' as const,
    icon: Clock,
    bgClass: 'text-[#FF8225] border-[#FF8225]',
    style: { backgroundColor: 'rgba(255, 130, 37, 0.1)' }
  },
  planning: { 
    label: 'Planificación', 
    color: 'default' as const,
    icon: FileText,
    bgClass: 'bg-gray-100 text-gray-700 border-gray-200',
    style: undefined
  }
};

const categoryConfig = {
  api: { label: 'API', bgClass: 'text-white border-[#B43F3F]', style: { backgroundColor: '#B43F3F' } },
  microservices: { label: 'Microservicios', bgClass: 'text-white border-[#FF8225]', style: { backgroundColor: '#FF8225' } },
  fullstack: { label: 'Full Stack', bgClass: 'text-[#F8EDED] border-[#173B45]', style: { backgroundColor: '#173B45' } },
  tools: { label: 'Herramientas', bgClass: 'text-[#173B45] border-[#F8EDED]', style: { backgroundColor: '#F8EDED' } }
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ className = '' }) => {
  return (
    <section 
      id="projects" 
      className={`
        py-20 px-4 
        ${className}
      `}
      style={{
        background: `linear-gradient(135deg, 
          rgba(248, 237, 237, 0.3) 0%,
          rgba(255, 130, 37, 0.1) 35%,
          rgba(180, 63, 63, 0.1) 65%,
          rgba(23, 59, 69, 0.2) 100%
        )`
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Chip 
              className="mb-6 backdrop-blur-xl px-4 py-2 border"
              style={{
                backgroundColor: 'rgba(248, 237, 237, 0.8)',
                color: '#173B45',
                borderColor: 'rgba(180, 63, 63, 0.3)'
              }}
              variant="bordered"
              size="lg"
              startContent={<Rocket size={18} style={{ color: '#B43F3F' }} />}
            >
              <span className="font-semibold">Proyectos Destacados</span>
            </Chip>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-6xl font-black mb-6 tracking-tight bg-clip-text text-transparent"
            style={{
              background: `linear-gradient(135deg, #173B45 0%, #B43F3F 50%, #FF8225 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Casos de Éxito
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: '#173B45' }}
          >
            Proyectos reales que demuestran mi experiencia en desarrollo backend, 
            desde APIs REST hasta arquitecturas de microservicios complejas
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <Card className="
                backdrop-blur-3xl 
                border 
                hover:shadow-2xl
                transition-all duration-700 ease-out hover:scale-[1.02]
                rounded-3xl overflow-hidden group
              "
              style={{
                backgroundColor: 'rgba(248, 237, 237, 0.7)',
                borderColor: 'rgba(180, 63, 63, 0.2)',
                boxShadow: '0 25px 50px -12px rgba(180, 63, 63, 0.15)'
              }}
              >
                <div className="grid lg:grid-cols-3 gap-0 min-h-[400px]">
                  {/* Content */}
                  <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-6">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="
                            p-4 rounded-3xl backdrop-blur-xl border shadow-lg
                            flex-shrink-0
                          "
                          style={{
                            background: `linear-gradient(135deg, 
                              rgba(180, 63, 63, 0.15) 0%, 
                              rgba(255, 130, 37, 0.15) 100%
                            )`,
                            borderColor: 'rgba(180, 63, 63, 0.3)',
                            boxShadow: '0 10px 30px rgba(180, 63, 63, 0.2)'
                          }}
                        >
                          <project.icon size={32} style={{ color: '#B43F3F' }} />
                        </motion.div>
                        <div>
                          <h3 className="text-3xl font-bold mb-3 tracking-tight" style={{ color: '#173B45' }}>
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            <div 
                              className={`
                                px-3 py-1.5 rounded-full text-sm font-medium
                                border backdrop-blur-xl
                                ${statusConfig[project.status].bgClass}
                              `}
                              style={statusConfig[project.status].style || undefined}
                            >
                              <div className="flex items-center gap-2">
                                {React.createElement(statusConfig[project.status].icon, { size: 14 })}
                                {statusConfig[project.status].label}
                              </div>
                            </div>
                            <div 
                              className={`
                                px-3 py-1.5 rounded-full text-sm font-medium
                                border backdrop-blur-xl
                                ${categoryConfig[project.category].bgClass}
                              `}
                              style={categoryConfig[project.category].style}
                            >
                              {categoryConfig[project.category].label}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-4 text-xl font-medium" style={{ color: '#173B45' }}>
                      {project.description}
                    </p>
                    <p className="mb-8 leading-relaxed text-lg" style={{ color: 'rgba(23, 59, 69, 0.8)' }}>
                      {project.longDescription}
                    </p>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h4 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: '#173B45' }}>
                        Stack Tecnológico
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: techIndex * 0.1, duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Chip
                              size="md"
                              className="
                                backdrop-blur-xl border 
                                transition-all duration-300 font-medium
                              "
                              style={{
                                backgroundColor: 'rgba(248, 237, 237, 0.8)',
                                color: '#173B45',
                                borderColor: 'rgba(180, 63, 63, 0.3)'
                              }}
                              variant="bordered"
                            >
                              {tech}
                            </Chip>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4">
                      {project.demoUrl && project.demoUrl !== 'null' && (
                        <Button
                          as={Link}
                          href={project.demoUrl}
                          target="_blank"
                          className="
                            text-white
                            hover:shadow-xl 
                            transition-all duration-300 hover:scale-105
                            font-semibold border-0 backdrop-blur-xl
                            flex items-center justify-center gap-2
                          "
                          style={{
                            background: `linear-gradient(135deg, #B43F3F 0%, #FF8225 100%)`,
                            boxShadow: '0 10px 30px rgba(180, 63, 63, 0.3)'
                          }}
                          radius="full"
                          startContent={<ExternalLink size={18} />}
                        >
                          Ver Demo
                        </Button>
                      )}
                      {project.githubUrl && project.githubUrl !== 'null' && (
                        <Button
                          as={Link}
                          href={project.githubUrl}
                          target="_blank"
                          className="
                            border 
                            transition-all duration-300 hover:scale-105 backdrop-blur-xl
                            font-semibold
                            flex items-center justify-center gap-2
                          "
                          style={{
                            backgroundColor: 'rgba(248, 237, 237, 0.8)',
                            color: '#173B45',
                            borderColor: 'rgba(180, 63, 63, 0.3)'
                          }}
                          radius="full"
                          startContent={<Github size={18} />}
                        >
                          Código
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="
                    p-8 lg:p-12 flex flex-col justify-center
                    backdrop-blur-xl border-l 
                  "
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(23, 59, 69, 0.1) 0%, 
                      rgba(180, 63, 63, 0.05) 100%
                    )`,
                    borderLeftColor: 'rgba(180, 63, 63, 0.2)'
                  }}
                  >
                    <h4 className="text-lg font-bold mb-6 tracking-wide" style={{ color: '#173B45' }}>
                      Características Principales
                    </h4>
                    <div className="space-y-4">
                      {project.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: featureIndex * 0.1 + 0.3, duration: 0.4 }}
                          className="flex items-start gap-3 group"
                        >
                          <div className="
                            w-6 h-6 rounded-xl text-white text-xs font-bold
                            flex items-center justify-center
                            flex-shrink-0 mt-0.5 shadow-lg 
                            group-hover:scale-110 transition-transform duration-300
                          "
                          style={{
                            background: `linear-gradient(135deg, #B43F3F 0%, #FF8225 100%)`,
                            boxShadow: '0 4px 15px rgba(180, 63, 63, 0.3)'
                          }}
                          >
                            <CheckCircle2 size={14} />
                          </div>
                          <span className="text-sm leading-relaxed font-medium" style={{ color: '#173B45' }}>
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mt-20"
        >
          <div className="
            backdrop-blur-3xl 
            border 
            rounded-3xl p-8 md:p-12 shadow-xl 
            max-w-3xl mx-auto
          "
          style={{
            backgroundColor: 'rgba(248, 237, 237, 0.8)',
            borderColor: 'rgba(180, 63, 63, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(180, 63, 63, 0.2)'
          }}
          >
            <p className="mb-8 text-xl leading-relaxed" style={{ color: '#173B45' }}>
              ¿Te interesa ver más de mi trabajo o colaborar en un proyecto?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                href="https://github.com/TiL3Ss"
                target="_blank"
                size="lg"
                className="
                  text-white
                  hover:shadow-xl 
                  transition-all duration-300 hover:scale-105
                  font-semibold border-0 backdrop-blur-xl h-14 px-8
                  flex items-center justify-center gap-2
                "
                style={{
                  background: `linear-gradient(135deg, #B43F3F 0%, #FF8225 100%)`,
                  boxShadow: '0 10px 30px rgba(180, 63, 63, 0.3)'
                }}
                radius="full"
                startContent={<Github size={20} />}
              >
                Ver GitHub Completo
              </Button>
              <Button
                size="lg"
                className="
                  border
                  transition-all duration-300 hover:scale-105 backdrop-blur-xl
                  font-semibold h-14 px-8
                  flex items-center justify-center gap-2
                "
                style={{
                  backgroundColor: 'rgba(248, 237, 237, 0.9)',
                  color: '#173B45',
                  borderColor: 'rgba(180, 63, 63, 0.3)'
                }}
                radius="full"
                onPress={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Hablemos del Proyecto
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};