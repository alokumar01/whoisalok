import { Html, Head, Body, Container, Text, Link } from "@react-email/components";

export const ReplyTemplate = ({ replyText }) => (
  <Html>
    <Head />
    <Body style={{ backgroundColor: "#f9f9f9", fontFamily: "Arial, sans-serif" }}>
      <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", backgroundColor: "#ffffff", border: "1px solid #ddd", borderRadius: "8px" }}>
        <Text style={{ fontSize: "20px", fontWeight: "bold", color: "#1a73e8" }}>Alok Kumar</Text>
        <Text>Dear Valued Contact,</Text>
        <Text>{replyText}</Text>
        <Text>
          I appreciate your interest and will get back to you as soon as possible. Feel free to explore my portfolio:{" "}
          <Link href="https://whoisalok.tech">https://whoisalok.tech</Link>
        </Text>
        <Text>Best regards,<br />Alok Kumar</Text>
        <Text style={{ fontSize: "12px", color: "#888" }}>
          This is an automated response from Alok's Portfolio. Please do not reply directly to this email.
        </Text>
      </Container>
    </Body>
  </Html>
);
