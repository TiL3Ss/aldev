// app/components/sections/ContactSection.tsx
'use client';

import { useState } from 'react';
import { 
  Button, 
  Card, 
  CardBody, 
  Input, 
  Textarea, 
  Chip,
  Link
} from '@heroui/react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Send,
  MessageCircle,
  Calendar,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface ContactSectionProps {
  className?: string;
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/TiL3Ss',
    username: '@TiL3Ss',
    description: 'Revisa mis proyectos open source'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/alvaro-developer',
    username: '/in/alvaro-developer',
    description: 'Conectemos profesionalmente'
  },
  {
    icon: Twitter,
    label: 'Twitter',
    href: 'https://twitter.com/alvaro_dev',
    username: '@alvaro_dev',
    description: 'Sígueme para tips de desarrollo'
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:contact@alvaro-dev.com',
    username: 'contact@alvaro-dev.com',
    description: 'Contacto directo por email'
  }
];

const quickActions = [
  {
    icon: Calendar,
    title: 'Agenda una Reunión',
    description: 'Conversemos sobre tu proyecto',
    action: 'Agendar',
    href: 'https://calendly.com/alvaro-developer/30min',
    badge: 'Disponible'
  },
  {
    icon: MessageCircle,
    title: 'Chat Directo',
    description: 'Hablemos por WhatsApp',
    action: 'Chatear',
    href: 'https://wa.me/1234567890?text=Hola%20Álvaro,%20me%20gustaría%20conversar%20sobre...',
    badge: 'Respuesta rápida'
  },
  {
    icon: Phone,
    title: 'Llamada',
    description: 'Para consultas urgentes',
    action: 'Llamar',
    href: 'tel:+1234567890',
    badge: 'Horario comercial'
  }
];

export const ContactSection: React.FC<ContactSectionProps> = ({ className = '' }) => {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};
    
    if (!form.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!form.email.trim()) newErrors.email = 'El email es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email no válido';
    }
    if (!form.subject.trim()) newErrors.subject = 'El asunto es requerido';
    if (!form.message.trim()) newErrors.message = 'El mensaje es requerido';
    else if (form.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Aquí puedes implementar el envío real del formulario
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setForm({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className={`py-20 px-4 relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, 
          rgba(248, 237, 237, 0.4) 0%,
          rgba(255, 130, 37, 0.08) 35%,
          rgba(180, 63, 63, 0.08) 65%,
          rgba(23, 59, 69, 0.15) 100%
        )`
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-20 left-20 w-40 h-40 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(180, 63, 63, 0.15)' }}
        />
        <div 
          className="absolute bottom-20 right-20 w-32 h-32 rounded-full blur-2xl"
          style={{ backgroundColor: 'rgba(255, 130, 37, 0.2)' }}
        />
        <div 
          className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full blur-xl"
          style={{ backgroundColor: 'rgba(23, 59, 69, 0.15)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
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
              startContent={<MessageCircle size={18} style={{ color: '#B43F3F' }} />}
            >
              <span className="font-semibold">Hablemos</span>
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
            Conectemos y Creemos
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: '#173B45' }}
          >
            ¿Tienes un proyecto interesante? ¿Necesitas consultoría técnica? 
            ¿O simplemente quieres charlar sobre tecnología? Estoy aquí para ayudarte.
          </motion.p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-6 auto-rows-auto">
          
          {/* Contact Form - Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-3 xl:col-span-4 row-span-2"
          >
            <Card className="
              backdrop-blur-3xl border transition-all duration-700 ease-out
              rounded-3xl overflow-hidden h-full
              hover:shadow-2xl hover:scale-[1.01]
            "
            style={{
              backgroundColor: 'rgba(248, 237, 237, 0.8)',
              borderColor: 'rgba(180, 63, 63, 0.2)',
              boxShadow: '0 25px 50px -12px rgba(180, 63, 63, 0.15)'
            }}
            >
              <CardBody className="p-8 lg:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h3 className="text-3xl font-bold mb-8 flex items-center gap-3" style={{ color: '#173B45' }}>
                    <div className="
                      p-3 rounded-2xl backdrop-blur-xl border shadow-lg
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
                      <Send size={24} style={{ color: '#B43F3F' }} />
                    </div>
                    Envíame un Mensaje
                  </h3>
                </motion.div>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-2xl flex items-center gap-3"
                    style={{
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.2)'
                    }}
                  >
                    <CheckCircle2 size={20} style={{ color: '#22c55e' }} />
                    <span style={{ color: '#15803d' }} className="font-medium">
                      ¡Mensaje enviado! Te responderé pronto.
                    </span>
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <Input
                        label="Tu Nombre"
                        placeholder="Escribe tu nombre completo"
                        value={form.name}
                        onValueChange={(value) => handleInputChange('name', value)}
                        isRequired
                        radius="lg"
                        isInvalid={!!errors.name}
                        errorMessage={errors.name}
                        classNames={{
                          input: "placeholder:text-gray-500",
                          label: "font-medium",
                          inputWrapper: `
                            backdrop-blur-xl border transition-all duration-300
                            focus-within:scale-[1.02]
                            ${errors.name ? 'border-red-500' : ''}
                          `,
                          errorMessage: "text-red-500"
                        }}
                        style={{
                          '--input-bg': 'rgba(248, 237, 237, 0.9)',
                          '--input-color': '#173B45',
                          '--label-color': '#173B45',
                          '--border-color': 'rgba(180, 63, 63, 0.3)',
                          '--focus-border-color': '#B43F3F'
                        } as React.CSSProperties}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <Input
                        type="email"
                        label="Email"
                        placeholder="tu@email.com"
                        value={form.email}
                        onValueChange={(value) => handleInputChange('email', value)}
                        isRequired
                        radius="lg"
                        isInvalid={!!errors.email}
                        errorMessage={errors.email}
                        classNames={{
                          input: "placeholder:text-gray-500",
                          label: "font-medium",
                          inputWrapper: `
                            backdrop-blur-xl border transition-all duration-300
                            focus-within:scale-[1.02]
                            ${errors.email ? 'border-red-500' : ''}
                          `,
                          errorMessage: "text-red-500"
                        }}
                        style={{
                          '--input-bg': 'rgba(248, 237, 237, 0.9)',
                          '--input-color': '#173B45',
                          '--label-color': '#173B45',
                          '--border-color': 'rgba(180, 63, 63, 0.3)',
                          '--focus-border-color': '#B43F3F'
                        } as React.CSSProperties}
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Input
                      label="Asunto"
                      placeholder="¿De qué quieres hablar?"
                      value={form.subject}
                      onValueChange={(value) => handleInputChange('subject', value)}
                      isRequired
                      radius="lg"
                      isInvalid={!!errors.subject}
                      errorMessage={errors.subject}
                      classNames={{
                        input: "placeholder:text-gray-500",
                        label: "font-medium",
                        inputWrapper: `
                          backdrop-blur-xl border transition-all duration-300 focus-within:scale-[1.02]
                          ${errors.subject ? 'border-red-500' : ''}
                        `
                      }}
                      style={{
                        '--input-bg': 'rgba(248, 237, 237, 0.9)',
                        '--input-color': '#173B45',
                        '--label-color': '#173B45',
                        '--border-color': 'rgba(180, 63, 63, 0.3)',
                        '--focus-border-color': '#B43F3F'
                      } as React.CSSProperties}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Textarea
                      label="Mensaje"
                      placeholder="Cuéntame sobre tu proyecto, idea o cualquier consulta que tengas..."
                      value={form.message}
                      onValueChange={(value) => handleInputChange('message', value)}
                      minRows={6}
                      isRequired
                      radius="lg"
                      isInvalid={!!errors.message}
                      errorMessage={errors.message}
                      classNames={{
                        input: "placeholder:text-gray-500",
                        label: "font-medium",
                        inputWrapper: `
                          backdrop-blur-xl border transition-all duration-300 focus-within:scale-[1.02]
                          ${errors.message ? 'border-red-500' : ''}
                        `
                      }}
                      style={{
                        '--input-bg': 'rgba(248, 237, 237, 0.9)',
                        '--input-color': '#173B45',
                        '--label-color': '#173B45',
                        '--border-color': 'rgba(180, 63, 63, 0.3)',
                        '--focus-border-color': '#B43F3F'
                      } as React.CSSProperties}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      radius="full"
                      className="
                        w-full text-white
                        hover:shadow-xl transition-all duration-300 hover:scale-[1.02]
                        font-semibold h-14 text-base border-0 backdrop-blur-xl
                        flex items-center justify-center gap-2
                      "
                      style={{
                        background: `linear-gradient(135deg, #B43F3F 0%, #FF8225 100%)`,
                        boxShadow: '0 10px 30px rgba(180, 63, 63, 0.3)'
                      }}
                      isLoading={isSubmitting}
                      startContent={!isSubmitting ? <Send size={20} /> : null}
                      isDisabled={isSubmitted}
                    >
                      {isSubmitting ? 'Enviando...' : isSubmitted ? '¡Enviado!' : 'Enviar Mensaje'}
                    </Button>
                  </motion.div>
                </form>
              </CardBody>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-1 xl:col-span-2"
          >
            <Card className="
              backdrop-blur-3xl border transition-all duration-700 ease-out
              rounded-3xl overflow-hidden h-full hover:shadow-xl hover:scale-[1.02]
            "
            style={{
              backgroundColor: 'rgba(248, 237, 237, 0.7)',
              borderColor: 'rgba(180, 63, 63, 0.2)',
              boxShadow: '0 15px 35px rgba(180, 63, 63, 0.1)'
            }}
            >
              <CardBody className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: '#173B45' }}>
                    <div className="
                      p-2 rounded-xl backdrop-blur-xl border
                    "
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(255, 130, 37, 0.15) 0%, 
                        rgba(180, 63, 63, 0.15) 100%
                      )`,
                      borderColor: 'rgba(255, 130, 37, 0.3)'
                    }}
                    >
                      <Sparkles size={18} style={{ color: '#FF8225' }} />
                    </div>
                    Acciones Rápidas
                  </h3>
                </motion.div>

                <div className="space-y-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <motion.div
                        key={action.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      >
                        <Link
                          href={action.href}
                          className="
                            block p-4 rounded-2xl border 
                            hover:shadow-lg
                            transition-all duration-300 hover:scale-[1.02] group
                            backdrop-blur-xl
                          "
                          style={{
                            backgroundColor: 'rgba(248, 237, 237, 0.5)',
                            borderColor: 'rgba(180, 63, 63, 0.2)'
                          }}
                          isExternal
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg group-hover:scale-110 transition-transform duration-300"
                            style={{
                              backgroundColor: 'rgba(180, 63, 63, 0.1)',
                              border: '1px solid rgba(180, 63, 63, 0.2)'
                            }}
                            >
                              <Icon size={16} style={{ color: '#B43F3F' }} />
                            </div>
                            <h4 className="font-semibold text-sm" style={{ color: '#173B45' }}>
                              {action.title}
                            </h4>
                          </div>
                          <p className="text-xs mb-3 leading-relaxed" style={{ color: 'rgba(23, 59, 69, 0.7)' }}>
                            {action.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="
                              inline-block text-xs font-medium px-3 py-1 rounded-full
                            "
                            style={{
                              backgroundColor: 'rgba(180, 63, 63, 0.1)',
                              color: '#B43F3F'
                            }}
                            >
                              {action.action}
                            </span>
                            {action.badge && (
                              <span className="
                                text-xs px-2 py-1 rounded-full font-medium
                              "
                              style={{
                                backgroundColor: 'rgba(255, 130, 37, 0.1)',
                                color: '#FF8225'
                              }}
                              >
                                {action.badge}
                              </span>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-2 xl:col-span-3"
          >
            <Card className="
              backdrop-blur-3xl border transition-all duration-700 ease-out
              rounded-3xl overflow-hidden h-full hover:shadow-xl hover:scale-[1.02]
            "
            style={{
              backgroundColor: 'rgba(248, 237, 237, 0.7)',
              borderColor: 'rgba(180, 63, 63, 0.2)',
              boxShadow: '0 15px 35px rgba(180, 63, 63, 0.1)'
            }}
            >
              <CardBody className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: '#173B45' }}>
                    <div className="
                      p-2 rounded-xl backdrop-blur-xl border
                    "
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(23, 59, 69, 0.15) 0%, 
                        rgba(180, 63, 63, 0.15) 100%
                      )`,
                      borderColor: 'rgba(23, 59, 69, 0.3)'
                    }}
                    >
                      <MessageCircle size={18} style={{ color: '#173B45' }} />
                    </div>
                    Redes Sociales
                  </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.div
                        key={social.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      >
                        <Link
                          href={social.href}
                          className="
                            flex items-center gap-3 p-3 rounded-xl
                            border border-transparent transition-all duration-300
                            group backdrop-blur-xl hover:scale-105
                          "
                          style={{
                            backgroundColor: 'rgba(248, 237, 237, 0.5)',
                            borderColor: 'rgba(180, 63, 63, 0.15)'
                          }}
                          isExternal
                        >
                          <div className="
                            p-2 rounded-lg 
                            group-hover:scale-110 transition-transform duration-300
                          "
                          style={{
                            backgroundColor: 'rgba(180, 63, 63, 0.1)',
                            border: '1px solid rgba(180, 63, 63, 0.2)'
                          }}
                          >
                            <Icon size={14} style={{ color: '#B43F3F' }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm" style={{ color: '#173B45' }}>
                              {social.label}
                            </div>
                            <div className="text-xs truncate" style={{ color: 'rgba(23, 59, 69, 0.7)' }}>
                              {social.username}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-2 xl:col-span-3"
          >
            <Card className="
              backdrop-blur-3xl border transition-all duration-700 ease-out
              rounded-3xl overflow-hidden h-full hover:shadow-xl hover:scale-[1.02]
            "
            style={{
              backgroundColor: 'rgba(248, 237, 237, 0.7)',
              borderColor: 'rgba(180, 63, 63, 0.2)',
              boxShadow: '0 15px 35px rgba(180, 63, 63, 0.1)'
            }}
            >
              <CardBody className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: '#173B45' }}>
                    <div className="
                      p-2 rounded-xl backdrop-blur-xl border
                    "
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(255, 130, 37, 0.15) 0%, 
                        rgba(23, 59, 69, 0.15) 100%
                      )`,
                      borderColor: 'rgba(255, 130, 37, 0.3)'
                    }}
                    >
                      <MapPin size={18} style={{ color: '#FF8225' }} />
                    </div>
                    Información de Contacto
                  </h3>
                </motion.div>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="p-4 rounded-2xl backdrop-blur-xl border"
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(180, 63, 63, 0.08) 0%, 
                        rgba(255, 130, 37, 0.08) 100%
                      )`,
                      borderColor: 'rgba(180, 63, 63, 0.2)'
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Clock size={16} style={{ color: '#B43F3F' }} />
                      <span className="font-medium" style={{ color: '#173B45' }}>
                        Horario de Respuesta
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: 'rgba(23, 59, 69, 0.8)' }}>
                      Usualmente respondo en 24 horas o menos
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="p-4 rounded-2xl backdrop-blur-xl border"
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(255, 130, 37, 0.08) 0%, 
                        rgba(23, 59, 69, 0.08) 100%
                      )`,
                      borderColor: 'rgba(255, 130, 37, 0.2)'
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin size={16} style={{ color: '#FF8225' }} />
                      <span className="font-medium" style={{ color: '#173B45' }}>
                        Ubicación
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: 'rgba(23, 59, 69, 0.8)' }}>
                      Zona horaria GMT-3 (Argentina)
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                    className="p-4 rounded-2xl backdrop-blur-xl border"
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(23, 59, 69, 0.08) 0%, 
                        rgba(180, 63, 63, 0.08) 100%
                      )`,
                      borderColor: 'rgba(23, 59, 69, 0.2)'
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <MessageCircle size={16} style={{ color: '#173B45' }} />
                      <span className="font-medium" style={{ color: '#173B45' }}>
                        Idiomas
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: 'rgba(23, 59, 69, 0.8)' }}>
                      Español • English • Português
                    </p>
                  </motion.div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mt-16"
        >
          <div className="
            max-w-3xl mx-auto p-8 rounded-3xl backdrop-blur-3xl border
          "
          style={{
            background: `linear-gradient(135deg, 
              rgba(248, 237, 237, 0.8) 0%,
              rgba(255, 130, 37, 0.1) 35%,
              rgba(180, 63, 63, 0.1) 65%,
              rgba(23, 59, 69, 0.1) 100%
            )`,
            borderColor: 'rgba(180, 63, 63, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(180, 63, 63, 0.2)'
          }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mb-6"
            >
              <Chip 
                className="backdrop-blur-xl px-4 py-2 border"
                style={{
                  backgroundColor: 'rgba(255, 130, 37, 0.15)',
                  color: '#FF8225',
                  borderColor: 'rgba(255, 130, 37, 0.3)'
                }}
                variant="bordered"
                size="lg"
                startContent={<Sparkles size={18} style={{ color: '#FF8225' }} />}
              >
                <span className="font-semibold">¿Listo para empezar?</span>
              </Chip>
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent"
              style={{
                background: `linear-gradient(135deg, #173B45 0%, #B43F3F 50%, #FF8225 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Tu Próximo Proyecto Comienza Aquí
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-lg mb-8 leading-relaxed"
              style={{ color: 'rgba(23, 59, 69, 0.8)' }}
            >
              No importa si es una idea pequeña o un proyecto ambicioso, 
              estoy aquí para ayudarte a hacerlo realidad con la mejor tecnología.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                as={Link}
                href="#contact"
                size="lg"
                radius="full"
                className="
                  text-white font-semibold px-8 h-14 text-base border-0 backdrop-blur-xl
                  hover:shadow-xl transition-all duration-300 hover:scale-105
                "
                style={{
                  background: `linear-gradient(135deg, #B43F3F 0%, #FF8225 100%)`,
                  boxShadow: '0 10px 30px rgba(180, 63, 63, 0.3)'
                }}
                startContent={<Send size={20} />}
              >
                Envíame un Mensaje
              </Button>
              
              <Button
                as={Link}
                href="https://calendly.com/alvaro-developer/30min"
                size="lg"
                radius="full"
                variant="bordered"
                className="
                  font-semibold px-8 h-14 text-base backdrop-blur-xl
                  hover:shadow-lg transition-all duration-300 hover:scale-105
                "
                style={{
                  color: '#173B45',
                  borderColor: 'rgba(180, 63, 63, 0.3)',
                  backgroundColor: 'rgba(248, 237, 237, 0.5)'
                }}
                startContent={<Calendar size={20} />}
                isExternal
              >
                Agendar Reunión
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
)};
