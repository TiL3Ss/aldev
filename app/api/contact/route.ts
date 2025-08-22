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

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email no válido' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_APP_PASSWORD, 
      },
    });

    // Configuracion del email
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

    // Estructura del email de confirmación al usuario
    const confirmationMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: '✅ Mensaje recibido - Te responderé pronto',
      html: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mensaje Recibido</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); min-height: 100vh;">
        
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          
          <!-- Header Card -->
          <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-radius: 28px; padding: 40px; margin-bottom: 24px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05); border: 1px solid rgba(255, 255, 255, 0.2);">
            
            <!-- Avatar/Icon -->
            <div style="text-align: center; margin-bottom: 24px;">
              <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; margin-bottom: 16px;">
                <span style="font-size: 36px; color: white;">✓</span>
              </div>
            </div>
            
            <!-- Title -->
            <h1 style="color: #1d1d1f; font-size: 32px; font-weight: 700; text-align: center; margin: 0 0 16px 0; letter-spacing: -0.5px; line-height: 1.2;">
              Gracias por contactarme, ${name}
            </h1>
            
            <!-- Subtitle -->
            <p style="color: #86868b; font-size: 18px; text-align: center; margin: 0 0 32px 0; line-height: 1.4; font-weight: 400;">
              He recibido tu mensaje y te responderé en las próximas 24 horas
            </p>
            
            <!-- Status Badge -->
            <div style="text-align: center;">
              <span style="display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #34d399 0%, #10b981 100%); color: white; padding: 12px 24px; border-radius: 50px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                <span style="width: 8px; height: 8px; background: rgba(255, 255, 255, 0.8); border-radius: 50%; display: inline-block;"></span>
                Mensaje Recibido
              </span>
            </div>
          </div>
          
          <!-- Message Summary Card -->
          <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-radius: 28px; padding: 32px; margin-bottom: 24px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05); border: 1px solid rgba(255, 255, 255, 0.2);">
            
            <!-- Card Header -->
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid rgba(0, 0, 0, 0.08);">
              <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 18px;">📝</span>
              </div>
              <h3 style="color: #1d1d1f; font-size: 20px; font-weight: 600; margin: 0; letter-spacing: -0.3px;">
                Resumen de tu mensaje
              </h3>
            </div>
            
            <!-- Message Details -->
            <div style="space-y: 16px;">
              <div style="margin-bottom: 16px;">
                <p style="color: #86868b; font-size: 14px; font-weight: 500; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                  ASUNTO
                </p>
                <p style="color: #1d1d1f; font-size: 16px; font-weight: 500; margin: 0; line-height: 1.4;">
                  ${subject}
                </p>
              </div>
              
              <div>
                <p style="color: #86868b; font-size: 14px; font-weight: 500; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                  MENSAJE
                </p>
                <div style="background: rgba(0, 0, 0, 0.02); border: 1px solid rgba(0, 0, 0, 0.06); border-radius: 16px; padding: 20px;">
                  <p style="color: #1d1d1f; font-size: 15px; line-height: 1.5; margin: 0; white-space: pre-wrap;">
                    ${message.replace(/\n/g, '<br>')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Contact Links Card -->
          <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-radius: 28px; padding: 32px; margin-bottom: 24px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05); border: 1px solid rgba(255, 255, 255, 0.2);">
            
            <p style="color: #1d1d1f; font-size: 18px; font-weight: 500; text-align: center; margin: 0 0 24px 0; line-height: 1.4;">
              Para consultas urgentes, también puedes contactarme por:
            </p>
            
            <!-- Contact Buttons -->
            <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px; margin: 0 auto;">
              
              <!-- LinkedIn Button -->
              <a href="https://linkedin.com/in/alvaro-developer" style="display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: rgba(0, 119, 181, 0.1); border: 1px solid rgba(0, 119, 181, 0.2); border-radius: 16px; text-decoration: none; transition: all 0.3s ease; color: #0077b5;">
                <div style="width: 32px; height: 32px; background: #0077b5; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <span style="color: white; font-size: 16px; font-weight: bold;">in</span>
                </div>
                <div style="flex: 1;">
                  <p style="color: #0077b5; font-size: 15px; font-weight: 600; margin: 0; line-height: 1.3;">LinkedIn</p>
                  <p style="color: rgba(0, 119, 181, 0.7); font-size: 13px; margin: 0; line-height: 1.3;">Conectemos profesionalmente</p>
                </div>
                <div style="color: rgba(0, 119, 181, 0.5); font-size: 18px;">→</div>
              </a>
              
              <!-- GitHub Button -->
              <a href="https://github.com/TiL3Ss" style="display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: rgba(51, 51, 51, 0.1); border: 1px solid rgba(51, 51, 51, 0.2); border-radius: 16px; text-decoration: none; transition: all 0.3s ease; color: #333;">
                <div style="width: 32px; height: 32px; background: #333; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <span style="color: white; font-size: 16px;">⚡</span>
                </div>
                <div style="flex: 1;">
                  <p style="color: #333; font-size: 15px; font-weight: 600; margin: 0; line-height: 1.3;">GitHub</p>
                  <p style="color: rgba(51, 51, 51, 0.7); font-size: 13px; margin: 0; line-height: 1.3;">Revisa mis proyectos</p>
                </div>
                <div style="color: rgba(51, 51, 51, 0.5); font-size: 18px;">→</div>
              </a>
            </div>
          </div>
          
          <!-- Footer Card -->
          <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-radius: 28px; padding: 32px; text-align: center; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05); border: 1px solid rgba(255, 255, 255, 0.2);">
            
            <!-- Avatar -->
            <div style="margin-bottom: 16px;">
              <div style="display: inline-block; width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 24px; font-weight: 600;">A</span>
              </div>
            </div>
            
            <!-- Signature -->
            <p style="color: #86868b; font-size: 14px; margin: 0 0 4px 0; line-height: 1.4;">
              Saludos cordiales,
            </p>
            <p style="color: #1d1d1f; font-size: 18px; font-weight: 600; margin: 0 0 4px 0; line-height: 1.3;">
              Álvaro
            </p>
            <p style="color: #86868b; font-size: 14px; margin: 0; line-height: 1.4;">
              Software Developer
            </p>
            
            <!-- Divider -->
            <div style="width: 40px; height: 2px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 1px; margin: 24px auto 16px auto;"></div>
            
            <!-- Footer Note -->
            <p style="color: #86868b; font-size: 12px; margin: 0; line-height: 1.4;">
              Álvaro - Software Developer
            </p>
          </div>
          
        </div>
      </body>
      </html>
      `,
    };

    // Enviao de Mails
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