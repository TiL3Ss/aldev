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
  Send,
  MessageCircle,
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
    href: 'https://linkedin.com/in/alvaro-chavez-melo-35392b338',
    username: '/in/alvaro-chavez-melo-35392b338',
    description: 'Conectemos profesionalmente'
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
    icon: MessageCircle,
    title: 'Chat Directo',
    description: 'Hablemos por WhatsApp',
    action: 'Chatear',
    href: 'https://wa.me/948583700?text=Hola%20Álvaro,%20me%20gustaría%20conversar%20sobre...',
    badge: 'Respuesta rápida'
  },
  {
    icon: Phone,
    title: 'Llamada',
    description: 'Para consultas urgentes',
    action: 'Llamar',
    href: 'tel:+56948583700',
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
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Limpiar formulario
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setIsSubmitted(true);
      
      // Opcional: mostrar notificación de éxito
      console.log('✅ Email enviado correctamente');
      
      // Restablecer estado después de 5 segundos
      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      // Manejar errores del servidor
      throw new Error(data.error || 'Error al enviar el mensaje');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    
    // Opcional: Mostrar mensaje de error al usuario
    alert('Error al enviar el mensaje. Por favor, intenta de nuevo.');
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
            className="
              mb-4 bg-gradient-to-r from-orange/15 to-burgundy/15 
              text-navy border-orange/25 rounded-full px-6 py-3
              backdrop-blur-xl shadow-lg shadow-orange/5
              flex items-center
            "
            variant="bordered"
            size="lg"
            startContent={
              <div className="flex items-center justify-center">
                <MessageCircle size={20} className="text-orange-dark" />
              </div>
            }
          >
            Hablemos
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
            className="lg:col-span-4 xl:col-span-6 row-span-2"
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
              <CardBody className="p-6 lg:p-8 h-full flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h3 className="text-2xl lg:text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: '#173B45' }}>
                    <div className="
                      p-2 lg:p-3 rounded-2xl backdrop-blur-xl border shadow-lg
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
                      <Send size={20} className="lg:w-6 lg:h-6" style={{ color: '#B43F3F' }} />
                    </div>
                    Envíame un Mensaje
                  </h3>
                </motion.div>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 rounded-2xl flex items-center gap-3"
                    style={{
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.2)'
                    }}
                  >
                    <CheckCircle2 size={18} style={{ color: '#22c55e' }} />
                    <span style={{ color: '#15803d' }} className="font-medium text-sm">
                      ¡Mensaje enviado! Te responderé pronto.
                    </span>
                  </motion.div>
                )}
                
                <form 
                  onSubmit={handleSubmit} 
                  className="flex-1 bg-white/70 backdrop-blur-2xl rounded-3xl p-4 lg:p-6 shadow-lg flex flex-col"
                >
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Nombre */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="space-y-2"
                      >
                        <label className="text-gray-700 font-medium text-sm block">
                          Tu Nombre *
                        </label>
                        <input
                          type="text"
                          placeholder="Escribe tu nombre completo"
                          value={form.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          className={`
                            w-full px-3 py-2 rounded-xl border bg-white/90 
                            text-gray-700 placeholder:text-gray-500
                            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                            transition-all duration-300
                            ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400'}
                          `}
                        />
                        {errors.name && (
                          <span className="text-red-500 text-xs">{errors.name}</span>
                        )}
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="space-y-2"
                      >
                        <label className="text-gray-700 font-medium text-sm block">
                          Email *
                        </label>
                        <input
                          type="email"
                          placeholder="tu@email.com"
                          value={form.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className={`
                            w-full px-3 py-2 rounded-xl border bg-white/90 
                            text-gray-700 placeholder:text-gray-500
                            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                            transition-all duration-300
                            ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400'}
                          `}
                        />
                        {errors.email && (
                          <span className="text-red-500 text-xs">{errors.email}</span>
                        )}
                      </motion.div>
                    </div>

                    {/* Asunto */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="space-y-2"
                    >
                      <label className="text-gray-700 font-medium text-sm block">
                        Asunto *
                      </label>
                      <input
                        type="text"
                        placeholder="¿De qué quieres hablar?"
                        value={form.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                        className={`
                          w-full px-3 py-2 rounded-xl border bg-white/90 
                          text-gray-700 placeholder:text-gray-500
                          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                          transition-all duration-300
                          ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400'}
                        `}
                      />
                      {errors.subject && (
                        <span className="text-red-500 text-xs">{errors.subject}</span>
                      )}
                    </motion.div>

                    {/* Mensaje */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="space-y-2 flex-1 flex flex-col"
                    >
                      <label className="text-gray-700 font-medium text-sm block">
                        Mensaje *
                      </label>
                      <textarea
                        placeholder="Cuéntame sobre tu proyecto, idea o cualquier consulta que tengas..."
                        value={form.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        className={`
                          flex-1 w-full px-3 py-2 rounded-xl border bg-white/90 
                          text-gray-700 placeholder:text-gray-500
                          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                          transition-all duration-300 resize-none min-h-[80px]
                          ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400'}
                        `}
                      />
                      {errors.message && (
                        <span className="text-red-500 text-xs">{errors.message}</span>
                      )}
                    </motion.div>
                  </div>

                  {/* Botón */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="mt-4"
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting || isSubmitted}
                      className="
                        w-full h-12 rounded-full text-white font-semibold text-base
                        bg-gradient-to-r from-burgundy to-orange
                        hover:shadow-xl hover:scale-[1.03] transition-all duration-300
                        flex items-center justify-center gap-2
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                      "
                      style={{
                        background: `linear-gradient(135deg, #B43F3F 0%, #FF8225 100%)`,
                        boxShadow: '0 8px 24px rgba(180, 63, 63, 0.3)'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Enviando...
                        </>
                      ) : isSubmitted ? (
                        '¡Enviado!'
                      ) : (
                        <>
                          <Send size={18} />
                          Enviar Mensaje
                        </>
                      )}
                    </button>
                  </motion.div>
                </form>

              </CardBody>
            </Card>
          </motion.div>

         

          {/* Social Links */}
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

      <div className="space-y-4">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.div
              key={social.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="p-4 rounded-2xl backdrop-blur-xl border cursor-pointer hover:scale-[1.02] hover:shadow-lg group transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(180, 63, 63, 0.08) 0%, 
                  rgba(255, 130, 37, 0.08) 100%
                )`,
                borderColor: 'rgba(180, 63, 63, 0.2)'
              }}
              onClick={() => window.open(social.href, '_blank')}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-1 rounded-lg group-hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundColor: 'rgba(180, 63, 63, 0.1)',
                  border: '1px solid rgba(180, 63, 63, 0.2)'
                }}
                >
                  <Icon size={16} style={{ color: '#B43F3F' }} />
                </div>
                <span className="font-medium group-hover:text-orange-600 transition-colors duration-300" style={{ color: '#173B45' }}>
                  {social.label}
                </span>
              </div>
              <p className="text-sm group-hover:text-gray-600 transition-colors duration-300" style={{ color: 'rgba(23, 59, 69, 0.8)' }}>
                {social.description}
              </p>
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
                      Español • English 
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
            className="
              mb-4 bg-gradient-to-r from-orange/15 to-burgundy/15 
              text-navy border-orange/25 rounded-full px-6 py-3
              backdrop-blur-xl shadow-lg shadow-orange/5
              flex items-center
            "
            variant="bordered"
            size="lg"
            startContent={
              <div className="flex items-center justify-center">
                <Sparkles size={20} className="text-orange-dark" />
              </div>
            }
          >
            ¿Listo para empezar?
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
                                  Envíame un mensaje
              </Button>
              
              
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
)};
