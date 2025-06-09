import { Html, Head, Body, Container, Text, Link } from "@react-email/components";

const ReplyTemplate = ({ replyText = "Thank you for reaching out!" }) => (
  <Html>
    <Head />
    <Body
      style={{
        backgroundColor: "#f9f9f9",
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        padding: "20px",
        margin: 0,
        boxSizing: "border-box",
      }}
    >
      <Container
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#ffffff",
          border: "1px solid #dddddd",
          borderRadius: "8px",
          boxSizing: "border-box",
        }}
      >
        <Text
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#1a73e8",
            marginBottom: "16px",
          }}
        >
          Alok Kumar
        </Text>
        <Text
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            marginBottom: "16px",
          }}
        >
          Dear Valued Contact,
        </Text>
        <Text
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            marginBottom: "16px",
          }}
        >
          {replyText}
        </Text>
        <Text
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            marginBottom: "16px",
          }}
        >
          I appreciate your interest and will get back to you as soon as possible. Feel free to explore my portfolio:{" "}
          <Link
            href="https://whoisalok.tech"
            style={{
              color: "#1a73e8",
              textDecoration: "underline",
            }}
          >
            whoisalok.tech
          </Link>
        </Text>
        <Text
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            marginBottom: "16px",
          }}
        >
          Best regards,
          <br />
          Alok Kumar
        </Text>
        <Text
          style={{
            fontSize: "12px",
            color: "#888888",
            marginTop: "24px",
          }}
        >
          This is an automated response from Alok's Portfolio. Please do not reply directly to this email.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ReplyTemplate;