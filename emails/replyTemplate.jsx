// emails/replyTemplate.jsx

import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr
} from "@react-email/components";

export function ReplyTemplate({ replyText }) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f4f4f4", fontFamily: "sans-serif", color: "#333" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
          <Section style={{ backgroundColor: "#1a73e8", color: "#fff", padding: "20px", borderRadius: "6px 6px 0 0" }}>
            <Text style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>Alok Kumar</Text>
            <Text style={{ fontSize: "14px", marginTop: "5px" }}>Thanks for reaching out!</Text>
          </Section>

          <Section style={{ backgroundColor: "#fff", padding: "20px", border: "1px solid #ddd", borderTop: "none" }}>
            <Text>Dear Valued Contact,</Text>

            <Text>{replyText}</Text>

            <Text>
              I appreciate your interest and will get back to you as soon as possible. Meanwhile, feel free to explore more about my work on my{" "}
              <Link href="https://whoisalok.tech">portfolio</Link>.
            </Text>

            <Text>
              Best regards,<br />
              Alok Kumar<br />
              <Link href="https://whoisalok.tech">whoisalok.tech</Link>
            </Text>
          </Section>

          <Section style={{ fontSize: "12px", color: "#999", textAlign: "center", paddingTop: "20px" }}>
            <Hr />
            <Text>This is an automated response from Alok's Portfolio. Please do not reply directly to this email.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
