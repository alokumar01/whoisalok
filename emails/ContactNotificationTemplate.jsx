import { Html } from '@react-email/html';
import { Tailwind } from '@react-email/tailwind';
import { Heading, Text } from '@react-email/components';

export const ContactNotificationTemplate = ({ name, email, message, timestamp }) => (
  <Html>
    <Tailwind>
      <div className="bg-gray-50 p-6 font-sans text-gray-900">
        <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-sm">
          <Heading className="mb-4 text-2xl font-semibold">
            New portfolio contact message
          </Heading>

          <Text className="mb-2 text-base">
            <strong>Name:</strong> {name}
          </Text>
          <Text className="mb-2 text-base">
            <strong>Email:</strong> {email}
          </Text>
          <Text className="mb-2 text-base">
            <strong>Timestamp:</strong> {timestamp}
          </Text>
          <Text className="mb-2 text-base">
            <strong>Message:</strong>
          </Text>
          <Text className="whitespace-pre-line text-base leading-relaxed">
            {message}
          </Text>
        </div>
      </div>
    </Tailwind>
  </Html>
);
