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