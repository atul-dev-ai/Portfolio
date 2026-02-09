import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Hr,
  Row,
  Column,
} from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
  subject: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
  subject,
}) => (
  <Html>
    <Head />
    <Preview>New message from your portfolio: {subject}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>📩 New Message Received</Heading>
        <Text style={text}>
          You have received a new message from your portfolio website contact
          form.
        </Text>

        <Section style={section}>
          <Row>
            <Column>
              <Text style={label}>Name:</Text>
              <Text style={value}>{name}</Text>
            </Column>
          </Row>
          <Row>
            <Column>
              <Text style={label}>Email:</Text>
              <Text style={value}>{email}</Text>
            </Column>
          </Row>
          <Row>
            <Column>
              <Text style={label}>Subject:</Text>
              <Text style={value}>{subject}</Text>
            </Column>
          </Row>
        </Section>

        <Hr style={hr} />

        <Heading style={h2}>Message:</Heading>
        <Section style={messageBox}>
          <Text style={messageText}>{message}</Text>
        </Section>

        <Hr style={hr} />

        <Text style={footer}>
          This email was sent from your Portfolio Contact Form.
        </Text>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  maxWidth: "580px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
  padding: "0",
};

const h2 = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "20px 30px 10px",
};

const text = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
  margin: "0 30px",
};

const section = {
  margin: "20px 30px",
  padding: "20px",
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};

const label = {
  color: "#8898aa",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  margin: "0 0 4px",
};

const value = {
  color: "#333",
  fontSize: "16px",
  margin: "0 0 16px",
};

const messageBox = {
  backgroundColor: "#f4f4f5",
  borderRadius: "8px",
  margin: "10px 30px",
  padding: "20px",
};

const messageText = {
  color: "#333",
  fontSize: "15px",
  lineHeight: "26px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
};
