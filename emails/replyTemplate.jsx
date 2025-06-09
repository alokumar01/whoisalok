import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";
import { Head, Heading, Text } from "@react-email/components";
import { EmailIcon } from "./EmailIcon";

const ReplyTemplate = ({ replyText = "Thank you for reaching out!" }) => (
  <Html>
    <Tailwind>
      <Head /> {/* ✅ Required for Tailwind media queries */}
      <div className="bg-white p-8 rounded-lg shadow-md max-w-xl mx-auto text-gray-800 font-sans" style={{ fontFamily: 'var(--font-geist)' }}>
        <Heading className="text-xl font-semibold mb-4">Hello</Heading>

        <Text className="text-base mb-4">
          {replyText}
        </Text>


        <div className="flex space-x-4 mb-6">
          <a
            href="https://github.com/yourgithub"
            className="text-gray-700 hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            <EmailIcon type="github" />
          </a>
          <a
            href="https://linkedin.com/in/yourlinkedin"
            className="text-gray-700 hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            <EmailIcon type="linkedin" />
          </a>
        </div>

        {/* ✅ Add email reply button */}
          <div className="mt-4 mb-6">
            <a
              href="mailto:alokkumar012148@gmail.com"
              className="inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700"
            >
              ✉️ Reply Here...
            </a>
          </div>

          <Text className="text-sm text-gray-600 mt-6">
            Best regards,<br />
            <strong>Alok Kumar</strong>
          </Text>

          <Text className="text-xs text-gray-400 mt-6 text-center">
            📫 Want to reach out directly? Just click the button above — it will open your email to contact me.
          </Text>

      </div>
    </Tailwind>
  </Html>
);

export default ReplyTemplate;
