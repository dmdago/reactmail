import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { ContactEmail } from "./emails/ContactEmail.jsx";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Configurar transporte de email (usar variables de entorno en producción)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "tu-email@gmail.com",
    pass: process.env.SMTP_PASS || "tu-app-password",
  },
});

// Endpoint para enviar email
app.post("/api/send-email", async (req, res) => {
  try {
    const { nombre, email, mensaje, destinatario } = req.body;

    // Validar campos requeridos
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({
        success: false,
        error: "Todos los campos son requeridos",
      });
    }

    // Renderizar el email usando React Email
    const emailHtml = await render(ContactEmail({ nombre, email, mensaje }));

    // Enviar el email
    const info = await transporter.sendMail({
      from: `"Formulario de Contacto" <${process.env.SMTP_USER || "tu-email@gmail.com"}>`,
      to: destinatario || process.env.EMAIL_TO || "destino@ejemplo.com",
      replyTo: email,
      subject: `Nuevo mensaje de ${nombre}`,
      html: emailHtml,
    });

    console.log("Email enviado:", info.messageId);

    res.json({
      success: true,
      message: "Email enviado correctamente",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error al enviar email:", error);
    res.status(500).json({
      success: false,
      error: "Error al enviar el email",
      details: error.message,
    });
  }
});

// Endpoint de prueba
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor funcionando" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
