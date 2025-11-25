import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components";
import * as React from "react";

export function ContactEmail({ nombre, email, mensaje }) {
  return React.createElement(Html, null,
    React.createElement(Head),
    React.createElement(Body, { style: main },
      React.createElement(Container, { style: container },
        React.createElement(Heading, { style: heading }, "Nuevo mensaje de contacto"),
        React.createElement(Hr, { style: hr }),
        React.createElement(Section, null,
          React.createElement(Text, { style: label }, "Nombre:"),
          React.createElement(Text, { style: value }, nombre),
          React.createElement(Text, { style: label }, "Email:"),
          React.createElement(Text, { style: value }, email),
          React.createElement(Text, { style: label }, "Mensaje:"),
          React.createElement(Text, { style: value }, mensaje)
        ),
        React.createElement(Hr, { style: hr }),
        React.createElement(Text, { style: footer }, "Este mensaje fue enviado desde el formulario de contacto.")
      )
    )
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "600px",
};

const heading = {
  color: "#333",
  fontSize: "24px",
  textAlign: "center",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const label = {
  color: "#666",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase",
  marginBottom: "4px",
};

const value = {
  color: "#333",
  fontSize: "16px",
  marginTop: "0",
  marginBottom: "16px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  textAlign: "center",
};

export default ContactEmail;
