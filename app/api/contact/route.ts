// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, subject, message } = body;

    // Validación básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email no válido' },
        { status: 400 }
      );
    }

    // Configurar transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_APP_PASSWORD, 
      },
    });

    // Configurar el email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'alvchdev@gmail.com',
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #173B45; border-bottom: 3px solid #FF8225; padding-bottom: 10px;">
            📧 Nuevo Mensaje de Contacto
          </h2>
          
          <div style="background: linear-gradient(135deg, #f8eded 0%, rgba(255, 130, 37, 0.1) 100%); padding: 20px; border-radius: 15px; margin: 20px 0;">
            <h3 style="color: #B43F3F; margin-top: 0;">Información del Contacto</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #FF8225;">${email}</a></p>
            <p><strong>Asunto:</strong> ${subject}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 15px; border-left: 4px solid #B43F3F;">
            <h3 style="color: #173B45; margin-top: 0;">📝 Mensaje</h3>
            <p style="line-height: 1.6; color: #444;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 10px; text-align: center;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Este mensaje fue enviado desde el formulario de contacto de tu portafolio
            </p>
          </div>
        </div>
      `,
      // Email de respuesta automática al usuario
      replyTo: email,
    };

    // Email de confirmación para el usuario
    const confirmationMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: '✅ Mensaje recibido - Te responderé pronto',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #173B45; border-bottom: 3px solid #FF8225; padding-bottom: 10px;">
            ¡Gracias por contactarme, ${name}!
          </h2>
          
          <div style="background: linear-gradient(135deg, #f8eded 0%, rgba(255, 130, 37, 0.1) 100%); padding: 20px; border-radius: 15px; margin: 20px 0;">
            <p style="font-size: 16px; color: #173B45;">
              He recibido tu mensaje y te responderé en las próximas 24 horas.
            </p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 15px; border-left: 4px solid #B43F3F;">
            <h3 style="color: #B43F3F; margin-top: 0;">📝 Resumen de tu mensaje</h3>
            <p><strong>Asunto:</strong> ${subject}</p>
            <p><strong>Mensaje:</strong></p>
            <p style="background: #f8f8f8; padding: 15px; border-radius: 8px; color: #444;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #666;">Si tienes algo urgente, también puedes contactarme por:</p>
            <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
              <a href="https://wa.me/948583700" style="color: #FF8225; text-decoration: none;">📱 WhatsApp</a>
              <a href="https://linkedin.com/in/alvaro-developer" style="color: #FF8225; text-decoration: none;">💼 LinkedIn</a>
              <a href="https://github.com/TiL3Ss" style="color: #FF8225; text-decoration: none;">🔗 GitHub</a>
            </div>
          </div>
          
          <div style="text-align: center; padding: 15px; background: #f9f9f9; border-radius: 10px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Saludos,<br>
              <strong style="color: #B43F3F;">Álvaro - Full Stack Developer</strong>
            </p>
          </div>
        </div>
      `,
    };

    // Enviar ambos emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json(
      { 
        message: 'Email enviado correctamente',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error al enviar email:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}