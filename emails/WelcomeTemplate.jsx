
import * as React from "react";

export const WelcomeTemplate = () => (
  <div
    style={{
      fontFamily: "Inter, sans-serif",
      backgroundColor: "#f9fafb", // Tailwind: bg-gray-50
      padding: "32px",             // Tailwind: p-8
      color: "#111827",            // Tailwind: text-gray-900
      lineHeight: "1.625",
    }}
  >
    <div
      style={{
        backgroundColor: "#ffffff",  // Tailwind: bg-white
        borderRadius: "0.5rem",      // Tailwind: rounded-lg
        padding: "32px",             // Tailwind: p-8
        maxWidth: "600px",
        margin: "0 auto",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", // Tailwind: shadow-sm
      }}
    >
      <h2
        style={{
          fontSize: "24px",          // Tailwind: text-2xl
          fontWeight: "600",         // Tailwind: font-semibold
          marginBottom: "16px",      // Tailwind: mb-4
        }}
      >
        🎉 Welcome to the newsletter!
      </h2>

      <p style={{ marginBottom: "16px" }}>
        Dear user,
      </p>

      <p style={{ marginBottom: "16px" }}>
        Thank you for subscribing! We're thrilled to have you with us. Expect valuable insights, updates, and occasional surprises directly in your inbox.
      </p>

      <p style={{ marginBottom: "32px" }}>
        If you have questions or suggestions, feel free to reply — I read every message.
      </p>

      <p>
        Warm regards,<br />
        <strong>Alok Kumar</strong>
      </p>
    </div>

    <p
      style={{
        fontSize: "12px",            // Tailwind: text-xs
        color: "#6b7280",            // Tailwind: text-gray-500
        marginTop: "32px",
        textAlign: "center",
      }}
    >
      You’re receiving this email because you subscribed to <a href="whoisalok.tech">whoisalok.tech</a> 
    </p>
  </div>
);
