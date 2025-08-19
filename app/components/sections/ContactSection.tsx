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
    color: 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
    description: 'Revisa mis proyectos open source'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/alvaro-developer',
    username: '/in/alvaro-developer',
    color: 'hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400',
    description: 'Conectemos profesionalmente'
  },
  {
    icon: Twitter,
    label: 'Twitter',
    href: 'https://twitter.com/alvaro_dev',
    username: '@alvaro_dev',
    color: 'hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-500 dark:hover:text-blue-400',
    description: 'Sígueme para tips de desarrollo'
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:contact@alvaro-dev.com',
    username: 'contact@alvaro-dev.com',
    color: 'hover:bg-orange-50 dark:hover:bg-orange-950 hover:text-orange-600 dark:hover:text-orange-400',
    description: 'Contacto directo por email'
  }
];

const quickActions = [
  {
    icon: Calendar,
    title: 'Agenda una Reunión',
    description: 'Conversemos sobre tu proyecto en una videollamada',
    action: 'Agendar',
    href: 'https://calendly.com/alvaro-developer/30min',
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconBg: 'bg-green-100 dark:bg-green-950/50',
    iconColor: 'text-green-600 dark:text-green-400',
    badge: 'Disponible'
  },
  {
    icon: MessageCircle,
    title: 'Chat Directo',
    description: 'Hablemos por WhatsApp o Telegram',
    action: 'Chatear',
    href: 'https://wa.me/1234567890?text=Hola%20Álvaro,%20me%20gustaría%20conversar%20sobre...',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconBg: 'bg-blue-100 dark:bg-blue-950/50',
    iconColor: 'text-blue-600 dark:text-blue-400',
    badge: 'Respuesta rápida'
  },
  {
    icon: Phone,
    title: 'Llamada Telefónica',
    description: 'Para consultas urgentes o discusiones técnicas',
    action: 'Llamar',
    href: 'tel:+1234567890',
    gradient: 'from-purple-500/20 to-violet-500/20',
    iconBg: 'bg-purple-100 dark:bg-purple-950/50',
    iconColor: 'text-purple-600 dark:text-purple-400',
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
      // Ejemplo con EmailJS o tu API backend
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
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      // Aquí podrías mostrar un mensaje de error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className={`
        py-20 px-4 relative overflow-hidden
        bg-gradient-to-t from-gray-50/50 via-blue-50/30 to-transparent
        dark:from-gray-900/50 dark:via-blue-950/30 dark:to-transparent
        ${className}
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
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
              startContent={<MessageCircle size={18} className="text-blue-600 dark:text-blue-400" />}
            >
              <span className="font-semibold">Hablemos</span>
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
            Conectemos y Creemos
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            ¿Tienes un proyecto interesante? ¿Necesitas consultoría técnica? 
            ¿O simplemente quieres charlar sobre tecnología? Estoy aquí para ayudarte.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-2"
          >
            <Card className="
              bg-white/60 dark:bg-black/40 backdrop-blur-3xl 
              border border-black/5 dark:border-white/10
              hover:border-blue-200/50 dark:hover:border-blue-700/50 
              hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-purple-500/20
              transition-all duration-700 ease-out
              rounded-3xl overflow-hidden
            ">
              <CardBody className="p-8 lg:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h3 className="
                    text-3xl font-bold text-gray-900 dark:text-white mb-8 
                    flex items-center gap-3
                  ">
                    <div className="
                      p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20
                      backdrop-blur-xl border border-blue-200/30 dark:border-purple-400/30
                    ">
                      <Send size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    Envíame un Mensaje
                  </h3>
                </motion.div>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
                      mb-6 p-4 rounded-2xl 
                      bg-green-100 dark:bg-green-950/50 
                      border border-green-200 dark:border-green-800
                      flex items-center gap-3
                    "
                  >
                    <CheckCircle2 size={20} className="text-green-600 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-300 font-medium">
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
                          input: "text-gray-900 dark:text-white",
                          label: "text-gray-700 dark:text-gray-300 font-medium",
                          inputWrapper: `
                            bg-white/70 dark:bg-black/50 backdrop-blur-xl
                            border border-gray-200/50 dark:border-gray-600/50
                            hover:border-blue-300/50 dark:hover:border-blue-500/50 
                            focus-within:border-blue-500 dark:focus-within:border-blue-400
                            transition-all duration-300
                            ${errors.name ? 'border-red-500 dark:border-red-400' : ''}
                          `,
                          errorMessage: "text-red-500 dark:text-red-400"
                        }}
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
                          input: "text-gray-900 dark:text-white",
                          label: "text-gray-700 dark:text-gray-300 font-medium",
                          inputWrapper: `
                            bg-white/70 dark:bg-black/50 backdrop-blur-xl
                            border border-gray-200/50 dark:border-gray-600/50
                            hover:border-blue-300/50 dark:hover:border-blue-500/50 
                            focus-within:border-blue-500 dark:focus-within:border-blue-400
                            transition-all duration-300
                            ${errors.email ? 'border-red-500 dark:border-red-400' : ''}
                          `,
                          errorMessage: "text-red-500 dark:text-red-400"
                        }}
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
                      classNames={{
                        input: "text-gray-900 dark:text-white",
                        label: "text-gray-700 dark:text-gray-300 font-medium",
                        inputWrapper: `
                          bg-white/70 dark:bg-black/50 backdrop-blur-xl
                          border border-gray-200/50 dark:border-gray-600/50
                          hover:border-blue-300/50 dark:hover:border-blue-500/50 
                          focus-within:border-blue-500 dark:focus-within:border-blue-400
                          transition-all duration-300
                        `
                      }}
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
                      classNames={{
                        input: "text-gray-900 dark:text-white",
                        label: "text-gray-700 dark:text-gray-300 font-medium",
                        inputWrapper: `
                          bg-white/70 dark:bg-black/50 backdrop-blur-xl
                          border border-gray-200/50 dark:border-gray-600/50
                          hover:border-blue-300/50 dark:hover:border-blue-500/50 
                          focus-within:border-blue-500 dark:focus-within:border-blue-400
                          transition-all duration-300
                        `
                      }}
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
                        w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white
                        hover:shadow-xl hover:shadow-blue-500/30
                        transition-all duration-300 hover:scale-[1.02]
                        font-semibold h-14 text-base border-0 backdrop-blur-xl
                      "
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

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <Card className="
              bg-white/60 dark:bg-black/40 backdrop-blur-3xl 
              border border-black/5 dark:border-white/10
              hover:border-blue-200/50 dark:hover:border-blue-700/50 
              hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-purple-500/20
              transition-all duration-700 ease-out
              rounded-3xl overflow-hidden
            ">
              <CardBody className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h3 className="
                    text-2xl font-bold text-gray-900 dark:text-white mb-6
                    flex items-center gap-3
                  ">
                    <div className="
                      p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20
                      backdrop-blur-xl border border-green-200/30 dark:border-blue-400/30
                    ">
                      <Sparkles size={20} className="text-green-600 dark:text-blue-400" />
                    </div>
                    Acciones Rápidas
                  </h3>
                </motion.div>

                <div className="space-y-4">
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
                            block p-4 rounded-2xl border border-gray-200/50 dark:border-gray-600/50
                            bg-gradient-to-br bg-white/50 dark:bg-black/30
                            hover:shadow-lg hover:border-blue-300/50 dark:hover:border-blue-500/50
                            transition-all duration-300 hover:scale-[1.02] group
                            backdrop-blur-xl
                          "
                          isExternal
                        >
                          <div className="flex items-start gap-4">
                            <div className={`
                              p-3 rounded-xl ${action.iconBg} 
                              group-hover:scale-110 transition-transform duration-300
                            `}>
                              <Icon size={20} className={action.iconColor} />
                            </div>
                            <div className="flex-1">
                              <h4 className="
                                font-semibold text-gray-900 dark:text-white mb-1
                                group-hover:text-blue-600 dark:group-hover:text-blue-400
                                transition-colors duration-300
                              ">
                                {action.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                                {action.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="
                                  inline-block text-xs font-medium px-3 py-1 rounded-full
                                  bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400
                                ">
                                  {action.action}
                                </span>
                                {action.badge && (
                                  <span className="
                                    text-xs px-2 py-1 rounded-full font-medium
                                    bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400
                                  ">
                                    {action.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>

            {/* Social Links */}
            <Card className="
              bg-white/60 dark:bg-black/40 backdrop-blur-3xl 
              border border-black/5 dark:border-white/10
              hover:border-blue-200/50 dark:hover:border-blue-700/50 
              hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-purple-500/20
              transition-all duration-700 ease-out
              rounded-3xl overflow-hidden
            ">
              <CardBody className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <h3 className="
                    text-2xl font-bold text-gray-900 dark:text-white mb-6
                    flex items-center gap-3
                  ">
                    <div className="
                      p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20
                      backdrop-blur-xl border border-purple-200/30 dark:border-pink-400/30
                    ">
                      <MessageCircle size={20} className="text-purple-600 dark:text-pink-400" />
                    </div>
                    Redes Sociales
                  </h3>
                </motion.div>

                <div className="space-y-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.div
                        key={social.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      >
                        <Link
                          href={social.href}
                          className={`
                            flex items-center gap-4 p-3 rounded-xl
                            border border-transparent transition-all duration-300
                            hover:border-gray-200/50 dark:hover:border-gray-600/50
                            group backdrop-blur-xl ${social.color}
                          `}
                          isExternal
                        >
                          <div className="
                            p-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50
                            group-hover:scale-110 transition-transform duration-300
                          ">
                            <Icon size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {social.label}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {social.username}
                            </div>
                            {social.description && (
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                {social.description}
                              </div>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>

            {/* Contact Info */}
            <Card className="
              bg-white/60 dark:bg-black/40 backdrop-blur-3xl 
              border border-black/5 dark:border-white/10
              hover:border-blue-200/50 dark:hover:border-blue-700/50 
              hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-purple-500/20
              transition-all duration-700 ease-out
              rounded-3xl overflow-hidden
            ">
              <CardBody className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <h3 className="
                    text-2xl font-bold text-gray-900 dark:text-white mb-6
                    flex items-center gap-3
                  ">
                    <div className="
                      p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20
                      backdrop-blur-xl border border-orange-200/30 dark:border-red-400/30
                    ">
                      <MapPin size={20} className="text-orange-600 dark:text-red-400" />
                    </div>
                    Información
                  </h3>
                </motion.div>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="
                      p-4 rounded-2xl bg-gradient-to-br from-blue-50/50 to-purple-50/50
                      dark:from-blue-950/30 dark:to-purple-950/30 backdrop-blur-xl
                      border border-blue-200/30 dark:border-purple-400/30
                    "
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Clock size={16} className="text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Horario de Respuesta
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Usualmente respondo en 24 horas o menos
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="
                      p-4 rounded-2xl bg-gradient-to-br from-green-50/50 to-blue-50/50
                      dark:from-green-950/30 dark:to-blue-950/30 backdrop-blur-xl
                      border border-green-200/30 dark:border-blue-400/30
                    "
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin size={16} className="text-green-600 dark:text-green-400" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Ubicación
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Zona horaria GMT-3 (Argentina)
                    </p>
                  </motion.div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};