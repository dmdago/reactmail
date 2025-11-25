import { Resend } from "resend";
import { render } from "@react-email/render";
import { ContactEmail } from "./_templates/ContactEmail.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({
        success: false,
        error: "Todos los campos son requeridos",
      });
    }

    const emailHtml = await render(ContactEmail({ nombre, email, mensaje }));

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Contacto <onboarding@resend.dev>",
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Nuevo mensaje de ${nombre}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Error Resend:", error);
      return res.status(500).json({
        success: false,
        error: "Error al enviar el email",
        details: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email enviado correctamente",
      id: data.id,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      error: "Error al enviar el email",
      details: error.message,
    });
  }
}
