import { after, NextResponse } from 'next/server';
import { Resend } from 'resend';
import dbConnect from '@/lib/mongodb';
import { rateLimiter } from '@/lib/withRateLimit';
import ContactForm from '@/lib/models/ContactForm';
import {
  formatContactTelegramMessage,
  sendTelegramMessage,
} from '@/lib/sendTelegramMessage';
import { contactFormSchema } from '@/lib/validations';
import { ContactThanksTemplate } from '@/emails/ContactThanksTemplate';
import { ContactNotificationTemplate } from '@/emails/ContactNotificationTemplate';

const resend = process.env.RESEND_EMAIL_API
  ? new Resend(process.env.RESEND_EMAIL_API)
  : null;

const ownerEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'alokkumar012148@gmail.com';

function getClientIp(req) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

async function saveContactMessage({ name, email, message, timestamp }) {
  await dbConnect();
  await ContactForm.create({
    name,
    email,
    message,
    timestamp,
  });
}

async function sendAutoReplyEmail({ name, email }) {
  if (!resend) {
    console.error('Contact auto-reply email skipped because RESEND_EMAIL_API is missing.');
    return;
  }

  await resend.emails.send({
    from: 'Alok Kumar <notify@mail.whoisalok.tech>',
    to: email,
    subject: 'Thanks for reaching out to Alok Kumar',
    react: <ContactThanksTemplate name={name} />,
  });
}

async function sendOwnerNotificationEmail({ name, email, message, timestamp }) {
  if (!resend) {
    console.error('Contact owner notification email skipped because RESEND_EMAIL_API is missing.');
    return;
  }

  await resend.emails.send({
    from: 'Alok Kumar <notify@mail.whoisalok.tech>',
    to: ownerEmail,
    replyTo: email,
    subject: `New portfolio contact from ${name}`,
    react: (
      <ContactNotificationTemplate
        name={name}
        email={email}
        message={message}
        timestamp={timestamp.toISOString()}
      />
    ),
  });
}

async function sendContactTelegramNotification({ name, email, message, timestamp }) {
  const telegramResult = await sendTelegramMessage(
    formatContactTelegramMessage({ name, email, message, timestamp })
  );

  if (!telegramResult.ok) {
    console.error('Contact Telegram notification failed:', telegramResult.error);
  }
}

async function runBackgroundTask(label, task) {
  try {
    await task();
  } catch (error) {
    console.error(label, error);
  }
}

function queueContactProcessing(payload) {
  after(async () => {
    await Promise.allSettled([
      runBackgroundTask('Contact form database write failed:', async () => {
        await saveContactMessage(payload);
      }),
      runBackgroundTask('Contact Telegram notification failed:', async () => {
        await sendContactTelegramNotification(payload);
      }),
      runBackgroundTask('Contact auto-reply email failed:', async () => {
        await sendAutoReplyEmail(payload);
      }),
      runBackgroundTask('Contact owner notification email failed:', async () => {
        await sendOwnerNotificationEmail(payload);
      }),
    ]);
  });
}

export async function POST(req) {
  let body;

  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  const validationResult = contactFormSchema.safeParse(body);

  if (!validationResult.success) {
    const validationMessage =
      validationResult.error.issues[0]?.message || 'Invalid input.';

    return NextResponse.json({ message: validationMessage }, { status: 400 });
  }

  const ip = getClientIp(req);
  const { allowed, message: rateLimitMessage } = await rateLimiter(ip);

  if (!allowed) {
    return NextResponse.json({ message: rateLimitMessage }, { status: 429 });
  }

  const { name, email, message } = validationResult.data;
  const timestamp = new Date();

  try {
    queueContactProcessing({ name, email, message, timestamp });
  } catch (error) {
    console.error('Contact background processing failed to start:', error);
    return NextResponse.json(
      { message: 'Unable to process your message right now.' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: 'Your message has been received successfully.' },
    { status: 200 }
  );
}
