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

    const transporter = nodemailer.createTransporter({
      service: 'gmail', 
      auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_APP_PASSWORD, 
      },
    });

    // Configuracion del email para ti
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
      replyTo: email,
    };

    // Email de confirmación al usuario - Nuevo diseño basado en tu componente React
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
        <style>
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .pulse { animation: pulse 2s infinite; }
          
          @media only screen and (max-width: 600px) {
            .container { padding: 20px 16px !important; }
            .card { padding: 24px !important; border-radius: 24px !important; }
            .header-card { padding: 32px 24px !important; }
            .contact-button { padding: 12px 16px !important; }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #f1f5f9 0%, #e0f2fe 50%, #e0e7ff 100%); min-height: 100vh;">
        
        <div class="container" style="max-width: 600px; margin: 0 auto; padding: 48px 24px;">
          
          <!-- Header Card -->
          <div class="card header-card" style="background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(40px); border-radius: 32px; padding: 40px; margin-bottom: 24px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); border: 1px solid rgba(255, 255, 255, 0.2);">
            
            <!-- Logo and Success Icon -->
            <div style="text-align: center; margin-bottom: 32px;">
              <div style="position: relative; display: inline-block; margin-bottom: 24px;">
                <!-- Logo placeholder - puedes reemplazar con tu logo real -->
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; margin: 0 auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
                  <span style="color: white; font-size: 32px; font-weight: bold;">A</span>
                </div>
                <!-- Success checkmark -->
                <div style="position: absolute; bottom: -8px; right: -8px; width: 32px; height: 32px; background: linear-gradient(135deg, #34d399 0%, #10b981 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                  <span style="color: white; font-size: 16px; font-weight: bold;">✓</span>
                </div>
              </div>
            </div>
            
            <!-- Title -->
            <h1 style="color: #1e293b; font-size: 28px; font-weight: 700; text-align: center; margin: 0 0 16px 0; letter-spacing: -0.5px; line-height: 1.2;">
              Gracias por contactarme, ${name}
            </h1>
            
            <!-- Subtitle -->
            <p style="color: #64748b; font-size: 18px; text-align: center; margin: 0 0 32px 0; line-height: 1.5; font-weight: 500;">
              He recibido tu mensaje y te responderé en las próximas 24 horas
            </p>
            
            <!-- Status Badge -->
            <div style="text-align: center;">
              <span style="display: inline-flex; align-items: center; gap: 12px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 12px 24px; border-radius: 50px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);">
                <span class="pulse" style="width: 8px; height: 8px; background: rgba(255, 255, 255, 0.8); border-radius: 50%; display: inline-block;"></span>
                Mensaje Recibido
              </span>
            </div>
          </div>
          
          <!-- Message Summary Card -->
          <div class="card" style="background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(40px); border-radius: 32px; padding: 32px; margin-bottom: 24px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); border: 1px solid rgba(255, 255, 255, 0.2);">
            
            <!-- Card Header -->
            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid rgba(0, 0, 0, 0.06);">
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);">
                <span style="color: white; font-size: 20px;">💬</span>
              </div>
              <h3 style="color: #1e293b; font-size: 20px; font-weight: 600; margin: 0; letter-spacing: -0.3px;">
                Resumen de tu mensaje
              </h3>
            </div>
            
            <!-- Message Details -->
            <div>
              <div style="margin-bottom: 24px;">
                <p style="color: #64748b; font-size: 12px; font-weight: 600; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">
                  ASUNTO
                </p>
                <p style="color: #1e293b; font-size: 16px; font-weight: 500; margin: 0; line-height: 1.5;">
                  ${subject}
                </p>
              </div>
              
              <div>
                <p style="color: #64748b; font-size: 12px; font-weight: 600; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px;">
                  MENSAJE
                </p>
                <div style="background: rgba(0, 0, 0, 0.02); backdrop-filter: blur(8px); border: 1px solid rgba(0, 0, 0, 0.06); border-radius: 24px; padding: 24px;">
                  <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">
                    ${message.replace(/\n/g, '<br>')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Contact Links Card -->
          <div class="card" style="background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(40px); border-radius: 32px; padding: 32px; margin-bottom: 24px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); border: 1px solid rgba(255, 255, 255, 0.2);">
            
            <p style="color: #1e293b; font-size: 18px; font-weight: 500; text-align: center; margin: 0 0 32px 0; line-height: 1.5;">
              Para consultas urgentes, también puedes contactarme por:
            </p>
            
            <!-- Contact Buttons -->
            <div style="max-width: 400px; margin: 0 auto;">
              
              <!-- LinkedIn Button -->
              <a href="https://linkedin.com/in/alvaro-developer" class="contact-button" style="display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: rgba(59, 130, 246, 0.05); backdrop-filter: blur(8px); border: 1px solid rgba(59, 130, 246, 0.15); border-radius: 16px; text-decoration: none; margin-bottom: 12px; transition: all 0.3s ease;">
                <div style="width: 40px; height: 40px; background: #0077b5; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0, 119, 181, 0.3);">
                  <span style="color: white; font-size: 18px; font-weight: bold;">in</span>
                </div>
                <div style="flex: 1;">
                  <p style="color: #1d4ed8; font-size: 14px; font-weight: 600; margin: 0 0 2px 0;">LinkedIn</p>
                  <p style="color: rgba(29, 78, 216, 0.7); font-size: 12px; margin: 0;">Conectemos profesionalmente</p>
                </div>
                <div style="color: rgba(29, 78, 216, 0.4); font-size: 16px; transition: all 0.3s ease;">→</div>
              </a>
              
              <!-- GitHub Button -->
              <a href="https://github.com/TiL3Ss" class="contact-button" style="display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: rgba(107, 114, 128, 0.05); backdrop-filter: blur(8px); border: 1px solid rgba(107, 114, 128, 0.15); border-radius: 16px; text-decoration: none; transition: all 0.3s ease;">
                <div style="width: 40px; height: 40px; background: #374151; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 8px rgba(55, 65, 81, 0.3);">
                  <span style="color: white; font-size: 18px;">⚡</span>
                </div>
                <div style="flex: 1;">
                  <p style="color: #374151; font-size: 14px; font-weight: 600; margin: 0 0 2px 0;">GitHub</p>
                  <p style="color: rgba(55, 65, 81, 0.7); font-size: 12px; margin: 0;">Revisa mis proyectos</p>
                </div>
                <div style="color: rgba(55, 65, 81, 0.4); font-size: 16px; transition: all 0.3s ease;">→</div>
              </a>
            </div>
          </div>
          
          <!-- Footer Card -->
          <div class="card" style="background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(40px); border-radius: 32px; padding: 32px; text-align: center; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); border: 1px solid rgba(255, 255, 255, 0.2);">
            
            <!-- Divider -->
            <div style="width: 48px; height: 2px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); border-radius: 1px; margin: 0 auto 16px auto;"></div>
            
            <!-- Footer Note -->
            <p style="color: #64748b; font-size: 12px; margin: 0; letter-spacing: 0.5px;">
              Álvaro - Software Developer
            </p>
          </div>
          
        </div>
      </body>
      </html>
      `,
    };

    // Envío de emails
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