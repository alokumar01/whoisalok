import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";
import { Heading, Text } from "@react-email/components";
import { EmailIcon } from "./EmailIcon";

export const ContactThanksTemplate = ({ name }) => (
  <Html>
    <Tailwind>
      <div className="bg-gray-10 p-8 rounded-lg shadow-lg max-w-xl mx-auto text-gray-800 font-sans" style={{ fontFamily: 'var(--font-geist)' }}>
        <Heading className="text-2xl font-semibold mb-4">
          Thanks for reaching out, {name}!
        </Heading>

        <Text className="text-base mb-4">
          I've received your message and will respond as soon as possible.
          Feel free to explore my portfolio or connect with me on social platforms.
        </Text>

        <div className="flex space-x-4 mb-6">
          <a href="https://github.com/alokumar01" className="text-gray-700 hover:text-black" target="_blank" rel="noopener noreferrer">
            <EmailIcon type="github" />
          </a>
          <a href="https://linkedin.com/in/alokumar01" className="text-gray-700 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
            <EmailIcon type="linkedin" />
          </a>
        </div>



        <Text className="text-sm text-gray-600 mt-6">
          Best,<br />
          <strong>Alok Kumar</strong><br />
          <a href="https://whoisalok.tech" className="text-blue-500 underline">whoisalok.tech</a>
        </Text>

        <Text className="text-xs text-gray-400 mt-8">
          📬 This is an automated message — please do not reply to this email.
        </Text>
      </div>
    </Tailwind>
  </Html>
);
