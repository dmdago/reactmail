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

export function ContactEmail({ nombre, email, mensaje }) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Nuevo mensaje de contacto</Heading>
          <Hr style={hr} />
          <Section>
            <Text style={label}>Nombre:</Text>
            <Text style={value}>{nombre}</Text>

            <Text style={label}>Email:</Text>
            <Text style={value}>{email}</Text>

            <Text style={label}>Mensaje:</Text>
            <Text style={value}>{mensaje}</Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Este mensaje fue enviado desde el formulario de contacto.
          </Text>
        </Container>
      </Body>
    </Html>
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
