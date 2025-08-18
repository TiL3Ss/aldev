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
  Zap
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
    icon: '✅' 
  },
  'in-progress': { 
    label: 'En Desarrollo', 
    color: 'warning' as const,
    icon: '🚧' 
  },
  planning: { 
    label: 'Planificación', 
    color: 'default' as const,
    icon: '📋' 
  }
};

const categoryConfig = {
  api: { label: 'API', color: 'primary' },
  microservices: { label: 'Microservicios', color: 'secondary' },
  fullstack: { label: 'Full Stack', color: 'success' },
  tools: { label: 'Herramientas', color: 'warning' }
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ className = '' }) => {
  return (
    <section 
      id="projects" 
      className={`py-20 px-4 bg-gradient-to-b from-transparent to-cream/30 ${className}`}
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
            <Rocket size={16} className="mr-2" />
            Proyectos Destacados
          </Chip>
          
          <h2 className="
            text-4xl md:text-5xl font-bold mb-6
            bg-gradient-to-r from-navy via-burgundy to-orange 
            bg-clip-text text-transparent
          ">
            Casos de Éxito
          </h2>
          
          <p className="text-xl text-navy/70 max-w-3xl mx-auto leading-relaxed">
            Proyectos reales que demuestran mi experiencia en desarrollo backend, 
            desde APIs REST hasta arquitecturas de microservicios complejas
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="
                bg-cream/20 backdrop-blur-xl border border-orange/20 
                hover:border-orange/40 hover:shadow-xl hover:shadow-orange/10
                transition-all duration-500 hover:-translate-y-2
                overflow-hidden
              ">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Content */}
                  <div className="p-8 lg:p-12">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="
                          p-4 rounded-2xl bg-gradient-to-br from-orange/20 to-burgundy/20
                          backdrop-blur-xl border border-orange/30
                        ">
                          <project.icon size={32} className="text-navy" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-navy mb-2">
                            {project.title}
                          </h3>
                          <div className="flex gap-2">
                            <Chip
                              size="sm"
                              variant="flat"
                              color={statusConfig[project.status].color}
                              startContent={
                                <span className="text-xs">
                                  {statusConfig[project.status].icon}
                                </span>
                              }
                            >
                              {statusConfig[project.status].label}
                            </Chip>
                            <Chip
                              size="sm"
                              variant="bordered"
                              className="border-orange/30 text-navy"
                            >
                              {categoryConfig[project.category].label}
                            </Chip>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-burgundy/80 mb-4 text-lg">
                      {project.description}
                    </p>
                    <p className="text-navy/70 mb-6 leading-relaxed">
                      {project.longDescription}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-navy mb-3 uppercase tracking-wide">
                        Tecnologías
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Chip
                            key={tech}
                            size="sm"
                            className="bg-orange/10 text-navy border-orange/20"
                            variant="bordered"
                          >
                            {tech}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      {project.demoUrl && (
                        <Button
                          as={Link}
                          href={project.demoUrl}
                          target="_blank"
                          className="
                            bg-gradient-to-r from-orange to-burgundy text-white
                            hover:shadow-lg hover:shadow-orange/25
                            transition-all duration-300 hover:-translate-y-0.5
                          "
                          startContent={<ExternalLink size={16} />}
                        >
                          Ver Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          as={Link}
                          href={project.githubUrl}
                          target="_blank"
                          variant="bordered"
                          className="
                            border-2 border-navy text-navy hover:bg-navy hover:text-cream
                            transition-all duration-300 hover:-translate-y-0.5
                          "
                          startContent={<Github size={16} />}
                        >
                          Código
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="bg-gradient-to-br from-orange/5 to-burgundy/5 p-8 lg:p-12">
                    <h4 className="text-lg font-bold text-navy mb-6">
                      Características Principales
                    </h4>
                    <div className="space-y-4">
                      {project.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="
                            w-6 h-6 rounded-full bg-gradient-to-r from-orange to-burgundy
                            flex items-center justify-center text-white text-xs font-bold
                            flex-shrink-0
                          ">
                            ✓
                          </div>
                          <span className="text-navy/80 text-sm">
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-navy/70 mb-6 text-lg">
            ¿Te interesa ver más de mi trabajo o colaborar en un proyecto?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link}
              href="https://github.com/TiL3Ss"
              target="_blank"
              size="lg"
              className="
                bg-gradient-to-r from-orange to-burgundy text-white
                hover:shadow-lg hover:shadow-orange/25
                transition-all duration-300 hover:-translate-y-0.5
                font-semibold px-8
              "
              startContent={<Github size={20} />}
            >
              Ver GitHub Completo
            </Button>
            <Button
              size="lg"
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
              Hablemos del Proyecto
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};