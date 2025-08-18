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
  MapPin
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
    color: 'hover:bg-navy/10 hover:text-navy'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/tu-perfil',
    username: '/in/alexander',
    color: 'hover:bg-blue-500/10 hover:text-blue-600'
  },
  {
    icon: Twitter,
    label: 'Twitter',
    href: 'https://twitter.com/tu-handle',
    username: '@alexander_dev',
    color: 'hover:bg-blue-400/10 hover:text-blue-500'
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:tu@email.com',
    username: 'tu@email.com',
    color: 'hover:bg-orange/10 hover:text-orange'
  }
];

const quickActions = [
  {
    icon: Calendar,
    title: 'Agenda una Reunión',
    description: 'Conversemos sobre tu proyecto en una videollamada',
    action: 'Agendar',
    href: 'https://calendly.com/tu-perfil'
  },
  {
    icon: MessageCircle,
    title: 'Chat Directo',
    description: 'Hablemos por WhatsApp o Telegram',
    action: 'Chatear',
    href: 'https://wa.me/tu-numero'
  },
  {
    icon: Phone,
    title: 'Llamada Telefónica',
    description: 'Para consultas urgentes o discusiones técnicas',
    action: 'Llamar',
    href: 'tel:+tu-numero'
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

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Aquí implementarías la lógica de envío
    // Por ahora solo simulamos el envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setForm({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    // Mostrar confirmación (podrías usar una notificación)
    alert('Mensaje enviado correctamente. Te responderé pronto!');
  };

  return (
    <section 
      id="contact" 
      className={`py-20 px-4 bg-gradient-to-t from-cream/50 to-transparent ${className}`}
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
            <MessageCircle size={16} className="mr-2" />
            Hablemos
          </Chip>
          
          <h2 className="
            text-4xl md:text-5xl font-bold mb-6
            bg-gradient-to-r from-navy via-burgundy to-orange 
            bg-clip-text text-transparent
          ">
            Conectemos y Creemos
          </h2>
          
          <p className="text-xl text-navy/70 max-w-3xl mx-auto leading-relaxed">
            ¿Tienes un proyecto interesante? ¿Necesitas consultoría técnica? 
            ¿O simplemente quieres charlar sobre tecnología? Estoy aquí para ayudarte.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="
              bg-cream/20 backdrop-blur-xl border border-orange/20 
              hover:border-orange/40 transition-all duration-300
            ">
              <CardBody className="p-8">
                <h3 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                  <Send size={24} />
                  Envíame un Mensaje
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Tu Nombre"
                      placeholder="Escribe tu nombre completo"
                      value={form.name}
                      onValueChange={(value) => handleInputChange('email', value)}
                      isRequired
                      classNames={{
                        input: "text-navy",
                        label: "text-navy/70",
                        inputWrapper: "bg-cream/40 border-orange/20 hover:border-orange/40 focus-within:border-orange"
                      }}
                    />
                  </div>
                  
                  <Input
                    label="Asunto"
                    placeholder="¿De qué quieres hablar?"
                    value={form.subject}
                    onValueChange={(value) => handleInputChange('subject', value)}
                    isRequired
                    classNames={{
                      input: "text-navy",
                      label: "text-navy/70",
                      inputWrapper: "bg-cream/40 border-orange/20 hover:border-orange/40 focus-within:border-orange"
                    }}
                  />
                  
                  <Textarea
                    label="Mensaje"
                    placeholder="Cuéntame sobre tu proyecto, idea o cualquier consulta que tengas..."
                    value={form.message}
                    onValueChange={(value) => handleInputChange('message', value)}
                    minRows={5}
                    isRequired
                    classNames={{
                      input: "text-navy",
                      label: "text-navy/70",
                      inputWrapper: "bg-cream/40 border-orange/20 hover:border-orange/40 focus-within:border-orange"
                    }}
                  />
                  
                  <Button
                    type="submit"
                    size="lg"
                    className="
                      w-full bg-gradient-to-r from-orange to-burgundy text-white
                      hover:shadow-lg hover:shadow-orange/25
                      transition-all duration-300 hover:-translate-y-0.5
                      font-semibold
                    "
                    isLoading={isSubmitting}
                    startContent={!isSubmitting ? <Send size={20} /> : null}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>
                </form>
              </CardBody>
            </Card>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <Card className="
              bg-cream/20 backdrop-blur-xl border border-orange/20
            ">
              <CardBody className="p-6">
                <h4 className="text-lg font-bold text-navy mb-4">
                  Acciones Rápidas
                </h4>
                <div className="space-y-3">
                  {quickActions.map((action) => (
                    <Button
                      key={action.title}
                      as={Link}
                      href={action.href}
                      target="_blank"
                      className="
                        w-full justify-start bg-transparent hover:bg-orange/10
                        text-navy border border-orange/20 hover:border-orange/40
                        transition-all duration-300 h-auto p-4
                      "
                      startContent={
                        <div className="
                          p-2 rounded-lg bg-gradient-to-br from-orange/20 to-burgundy/20
                          backdrop-blur-xl border border-orange/30
                        ">
                          <action.icon size={18} />
                        </div>
                      }
                    >
                      <div className="text-left flex-1">
                        <div className="font-semibold text-sm">
                          {action.title}
                        </div>
                        <div className="text-xs text-navy/60 mt-1">
                          {action.description}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Social Links */}
            <Card className="
              bg-cream/20 backdrop-blur-xl border border-orange/20
            ">
              <CardBody className="p-6">
                <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                  <MessageCircle size={20} />
                  Sígueme en
                </h4>
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.label}
                      as={Link}
                      href={social.href}
                      target="_blank"
                      className={`
                        w-full justify-start bg-transparent 
                        text-navy border border-orange/20 hover:border-orange/40
                        transition-all duration-300 h-auto p-4
                        ${social.color}
                      `}
                      startContent={<social.icon size={20} />}
                    >
                      <div className="text-left flex-1">
                        <div className="font-semibold text-sm">
                          {social.label}
                        </div>
                        <div className="text-xs text-navy/60 mt-1">
                          {social.username}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Location & Availability */}
            <Card className="
              bg-gradient-to-br from-orange/10 via-burgundy/10 to-navy/10
              backdrop-blur-xl border border-orange/20
            ">
              <CardBody className="p-6">
                <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                  <MapPin size={20} />
                  Ubicación & Disponibilidad
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="
                      w-3 h-3 rounded-full bg-green-500 animate-pulse
                      shadow-lg shadow-green-500/50
                    "></div>
                    <div>
                      <div className="text-sm font-semibold text-navy">
                        Disponible para proyectos
                      </div>
                      <div className="text-xs text-navy/60">
                        Respuesta en menos de 24h
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-burgundy" />
                    <div>
                      <div className="text-sm font-semibold text-navy">
                        Puerto Aysén, Chile
                      </div>
                      <div className="text-xs text-navy/60">
                        GMT-3 (Trabajo remoto)
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-orange/20">
                    <div className="text-xs text-navy/70 leading-relaxed">
                      Horario preferido de contacto:
                      <br />
                      Lun-Vie: 9:00 - 18:00 GMT-3
                      <br />
                      Fines de semana: Solo emergencias
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="
            bg-gradient-to-r from-orange/10 via-burgundy/10 to-navy/10
            backdrop-blur-xl border border-orange/20
          ">
            <CardBody className="p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-navy mb-4">
                  ¿Listo para llevar tu proyecto al siguiente nivel?
                </h3>
                <p className="text-navy/70 mb-6 leading-relaxed">
                  Ya sea que necesites desarrollar una API desde cero, migrar a microservicios, 
                  optimizar performance o simplemente una consultoría técnica, 
                  estoy aquí para ayudarte a tomar las mejores decisiones.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="
                      bg-gradient-to-r from-orange to-burgundy text-white
                      hover:shadow-lg hover:shadow-orange/25
                      transition-all duration-300 hover:-translate-y-0.5
                      font-semibold px-8
                    "
                    startContent={<Calendar size={20} />}
                    as={Link}
                    href="https://calendly.com/tu-perfil"
                    target="_blank"
                  >
                    Agendar Consulta Gratuita
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="bordered"
                    className="
                      border-2 border-navy text-navy hover:bg-navy hover:text-cream
                      transition-all duration-300 hover:-translate-y-0.5
                      font-semibold px-8
                    "
                    startContent={<Mail size={20} />}
                    as={Link}
                    href="mailto:tu@email.com"
                  >
                    Enviar Email Directo
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};InputChange('name', value)}
                      isRequired
                      classNames={{
                        input: "text-navy",
                        label: "text-navy/70",
                        inputWrapper: "bg-cream/40 border-orange/20 hover:border-orange/40 focus-within:border-orange"
                      }}
                    />
                    <Input
                      type="email"
                      label="Email"
                      placeholder="tu@email.com"
                      value={form.email}
                      onValueChange={(value) => handle