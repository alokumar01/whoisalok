// emails/WelcomeTemplate.jsx
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";
import { Head, Heading, Text } from "@react-email/components";

export const WelcomeTemplate = () => (
  <Html>
    <Tailwind>
      {/* ✅ Head is required for Tailwind media queries */}
      <Head />
      <div className="bg-gray-50 p-6 sm:p-8 font-sans text-gray-900">
        <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm max-w-xl mx-auto">
          <Heading className="text-2xl font-semibold mb-4">
            🎉 Welcome to the newsletter!
          </Heading>

          <Text className="mb-4 text-base">Dear user,</Text>

          <Text className="mb-4 text-base leading-relaxed">
            Thank you for subscribing! I'm thrilled to have you with me. Expect valuable insights, updates, and the occasional surprise — straight to your inbox.
          </Text>

          <Text className="mb-6 text-base leading-relaxed">
            If you have any questions or suggestions, feel free to explore my site or follow me on social platforms.
          </Text>

          <Text className="text-base">
            Warm regards,<br />
            <strong>Alok Kumar</strong>
          </Text>
        </div>

        <Text className="text-xs text-gray-500 text-center mt-8">
          You’re receiving this email because you subscribed to <a href="https://whoisalok.tech" className="underline text-blue-500">whoisalok.tech</a>.<br />
          📭 This is an automated message — please do not reply to this email.
        </Text>
      </div>
    </Tailwind>
  </Html>
);
