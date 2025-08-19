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
    id: 'ecommerce-api',
    title: 'E-commerce REST API',
    description: 'API completa para plataforma de comercio electrónico',
    longDescription: 'Sistema backend robusto con gestión de productos, usuarios, pedidos, pagos e inventario. Incluye autenticación JWT, validación de datos, rate limiting y documentación automática con Swagger.',
    icon: Server,
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe', 'Docker'],
    features: [
      'Autenticación y autorización completa',
      'Gestión de productos e inventario',
      'Sistema de pedidos y pagos',
      'Rate limiting y caching',
      'Documentación API automática',
      'Tests unitarios y de integración'
    ],
    demoUrl: 'https://api-demo.example.com',
    githubUrl: 'https://github.com/tu-usuario/ecommerce-api',
    status: 'completed',
    category: 'api'
  },
  {
    id: 'microservices-platform',
    title: 'Plataforma Microservicios',
    description: 'Arquitectura distribuida para aplicaciones empresariales',
    longDescription: 'Sistema de microserviios con API Gateway, service discovery, circuit breakers y monitoreo distribuido. Incluye servicios para autenticación, notificaciones, archivos y anályticas.',
    icon: Zap,
    technologies: ['Next.js', 'Docker', 'Redis', 'PostgreSQL', 'RabbitMQ', 'Prometheus'],
    features: [
      'API Gateway con rate limiting',
      'Service discovery automático',
      'Circuit breaker pattern',
      'Comunicación asíncrona',
      'Monitoreo y alertas',
      'Escalado automático'
    ],
    demoUrl: 'https://microservices-demo.example.com',
    githubUrl: 'https://github.com/tu-usuario/microservices-platform',
    status: 'in-progress',
    category: 'microservices'
  },
  {
    id: 'analytics-dashboard',
    title: 'Dashboard Analytics Real-time',
    description: 'Plataforma de análisis con visualizaciones en tiempo real',
    longDescription: 'Sistema fullstack con Next.js para análisis de datos en tiempo real, WebSockets para updates live, ETL pipelines y visualizaciones interactivas.',
    icon: BarChart3,
    technologies: ['Next.js', 'TypeScript', 'WebSockets', 'MongoDB', 'Chart.js', 'Vercel'],
    features: [
      'Datos en tiempo real con WebSockets',
      'ETL pipelines automatizados',
      'Visualizaciones interactivas',
      'Filtros y exportación de datos',
      'Alertas personalizables',
      'API REST para integraciones'
    ],
    demoUrl: 'https://analytics.example.com',
    githubUrl: 'https://github.com/tu-usuario/analytics-dashboard',
    status: 'completed',
    category: 'fullstack'
  },
  {
    id: 'auth-service',
    title: 'Servicio de Autenticación',
    description: 'Microservicio de auth con OAuth y JWT',
    longDescription: 'Servicio especializado en autenticación y autorización con soporte para múltiples providers OAuth, gestión de sesiones, 2FA y políticas de seguridad avanzadas.',
    icon: Shield,
    technologies: ['Node.js', 'TypeScript', 'Redis', 'PostgreSQL', 'OAuth', 'Docker'],
    features: [
      'OAuth con múltiples providers',
      'Autenticación de dos factores',
      'Gestión de sesiones con Redis',
      'Políticas de seguridad flexibles',
      'Rate limiting inteligente',
      'Logs de auditoría completos'
    ],
    githubUrl: 'https://github.com/tu-usuario/auth-service',
    status: 'completed',
    category: 'api'
  },
  {
    id: 'file-processor',
    title: 'Procesador de Archivos',
    description: 'Sistema de procesamiento asíncrono de archivos',
    longDescription: 'Herramienta para procesamiento masivo de archivos con cola de trabajos, conversión de formatos, optimización de imágenes y almacenamiento en la nube.',
    icon: Database,
    technologies: ['Node.js', 'Bull Queue', 'Sharp', 'AWS S3', 'Redis', 'Docker'],
    features: [
      'Cola de trabajos con Bull',
      'Procesamiento de imágenes',
      'Conversión de formatos',
      'Upload a múltiples clouds',
      'Progress tracking en tiempo real',
      'Retry logic inteligente'
    ],
    githubUrl: 'https://github.com/tu-usuario/file-processor',
    status: 'planning',
    category: 'tools'
  }
];

const statusConfig = {
  completed: { 
    label: 'Completado', 
    color: 'success' as const,
    icon: CheckCircle2,
    bgClass: 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
  },
  'in-progress': { 
    label: 'En Desarrollo', 
    color: 'warning' as const,
    icon: Clock,
    bgClass: 'bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800'
  },
  planning: { 
    label: 'Planificación', 
    color: 'default' as const,
    icon: FileText,
    bgClass: 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700'
  }
};

const categoryConfig = {
  api: { label: 'API', bgClass: 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
  microservices: { label: 'Microservicios', bgClass: 'bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800' },
  fullstack: { label: 'Full Stack', bgClass: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' },
  tools: { label: 'Herramientas', bgClass: 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800' }
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ className = '' }) => {
  return (
    <section 
      id="projects" 
      className={`
        py-20 px-4 
        bg-gradient-to-b from-gray-50/50 via-blue-50/30 to-purple-50/50
        dark:from-gray-900/50 dark:via-blue-950/30 dark:to-purple-950/50
        ${className}
      `}
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
              className="
                mb-6 bg-white/70 dark:bg-black/50 text-gray-800 dark:text-gray-200
                border border-gray-200/50 dark:border-gray-600/50
                backdrop-blur-xl px-4 py-2
              "
              variant="bordered"
              size="lg"
              startContent={<Rocket size={18} className="text-blue-600 dark:text-blue-400" />}
            >
              <span className="font-semibold">Proyectos Destacados</span>
            </Chip>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="
              text-5xl md:text-6xl font-black mb-6 tracking-tight
              bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 
              dark:from-white dark:via-blue-400 dark:to-purple-400
              bg-clip-text text-transparent
            "
          >
            Casos de Éxito
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
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
                bg-white/60 dark:bg-black/40 backdrop-blur-3xl 
                border border-black/5 dark:border-white/10
                hover:border-blue-200/50 dark:hover:border-blue-700/50 
                hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-purple-500/20
                transition-all duration-700 ease-out hover:scale-[1.02]
                rounded-3xl overflow-hidden group
              ">
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
                            p-4 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20
                            backdrop-blur-xl border border-blue-200/30 dark:border-purple-400/30
                            shadow-lg shadow-blue-500/10 dark:shadow-purple-500/20
                          "
                        >
                          <project.icon size={32} className="text-blue-600 dark:text-blue-400" />
                        </motion.div>
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            <div className={`
                              px-3 py-1.5 rounded-full text-sm font-medium
                              border backdrop-blur-xl
                              ${statusConfig[project.status].bgClass}
                            `}>
                              <div className="flex items-center gap-2">
                                {React.createElement(statusConfig[project.status].icon, { size: 14 })}
                                {statusConfig[project.status].label}
                              </div>
                            </div>
                            <div className={`
                              px-3 py-1.5 rounded-full text-sm font-medium
                              border backdrop-blur-xl
                              ${categoryConfig[project.category].bgClass}
                            `}>
                              {categoryConfig[project.category].label}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-xl font-medium">
                      {project.description}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-lg">
                      {project.longDescription}
                    </p>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
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
                                bg-white/70 dark:bg-black/50 text-gray-700 dark:text-gray-300
                                border border-gray-200/50 dark:border-gray-600/50
                                backdrop-blur-xl hover:bg-blue-50/70 dark:hover:bg-blue-950/50
                                transition-all duration-300 font-medium
                              "
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
                      {project.demoUrl && (
                        <Button
                          as={Link}
                          href={project.demoUrl}
                          target="_blank"
                          className="
                            bg-gradient-to-r from-blue-500 to-purple-600 text-white
                            hover:shadow-xl hover:shadow-blue-500/30
                            transition-all duration-300 hover:scale-105
                            font-semibold border-0 backdrop-blur-xl
                          "
                          radius="full"
                          startContent={<ExternalLink size={18} />}
                        >
                          Ver Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          as={Link}
                          href={project.githubUrl}
                          target="_blank"
                          className="
                            bg-white/70 dark:bg-black/50 text-gray-800 dark:text-gray-200
                            border border-gray-200/50 dark:border-gray-600/50
                            hover:bg-gray-50/70 dark:hover:bg-gray-800/50
                            transition-all duration-300 hover:scale-105 backdrop-blur-xl
                            font-semibold
                          "
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
                    bg-gradient-to-br from-gray-50/80 to-blue-50/80 
                    dark:from-gray-800/50 dark:to-blue-950/50 
                    p-8 lg:p-12 flex flex-col justify-center
                    backdrop-blur-xl border-l border-gray-200/30 dark:border-gray-700/30
                  ">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6 tracking-wide">
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
                            w-6 h-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600
                            flex items-center justify-center text-white text-xs font-bold
                            flex-shrink-0 mt-0.5 shadow-lg shadow-blue-500/25
                            group-hover:scale-110 transition-transform duration-300
                          ">
                            <CheckCircle2 size={14} />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-medium">
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
            bg-white/60 dark:bg-black/40 backdrop-blur-3xl 
            border border-black/5 dark:border-white/10
            rounded-3xl p-8 md:p-12 shadow-xl shadow-black/5 dark:shadow-white/10
            max-w-3xl mx-auto
          ">
            <p className="text-gray-700 dark:text-gray-300 mb-8 text-xl leading-relaxed">
              ¿Te interesa ver más de mi trabajo o colaborar en un proyecto?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                href="https://github.com/TiL3Ss"
                target="_blank"
                size="lg"
                className="
                  bg-gradient-to-r from-blue-500 to-purple-600 text-white
                  hover:shadow-xl hover:shadow-blue-500/30
                  transition-all duration-300 hover:scale-105
                  font-semibold border-0 backdrop-blur-xl h-14 px-8
                "
                radius="full"
                startContent={<Github size={20} />}
              >
                Ver GitHub Completo
              </Button>
              <Button
                size="lg"
                className="
                  bg-white/70 dark:bg-black/50 text-gray-800 dark:text-gray-200
                  border border-gray-200/50 dark:border-gray-600/50
                  hover:bg-gray-50/70 dark:hover:bg-gray-800/50
                  transition-all duration-300 hover:scale-105 backdrop-blur-xl
                  font-semibold h-14 px-8
                "
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