// emails/ContactThanksTemplate.jsx
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";
import { Heading, Text } from "@react-email/components";

export const ContactThanksTemplate = ({ name }) => (
  <Html>
    <Tailwind>
      <div className="bg-white p-6 rounded-xl shadow-md text-gray-800 font-sans" style={{ fontFamily: 'var(--font-geist)' }}>
        <Heading className="text-xl font-bold">Thanks for reaching out, {name}!</Heading>
        <Text className="mt-2 text-sm">
          We've received your message and will get back to you shortly. Until then, feel free to explore my portfolio or follow me on GitHub and LinkedIn.
        </Text>
        <Text className="text-xs mt-4">Regards,<br />Alok Kumar<br />whoisalok.tech</Text>
      </div>
    </Tailwind>
  </Html>
);
