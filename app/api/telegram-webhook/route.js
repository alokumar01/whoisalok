import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { TelegramReplyTemplates } from '@/emails/TelegramReplyTemplates';
import { rateLimiter } from '@/lib/withRateLimit';
import { sendTelegramMessage } from '@/lib/sendTelegramMessage';
import { telegramReplySchema } from '@/lib/validations';

const resend = process.env.RESEND_EMAIL_API
  ? new Resend(process.env.RESEND_EMAIL_API)
  : null;

function getClientIp(req) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

async function notifyTelegram(chatId, text) {
  if (!chatId) return;

  const result = await sendTelegramMessage(text, { chatId });
  if (!result.ok) {
    console.error('Telegram webhook feedback message failed:', result.error);
  }
}

export async function POST(req) {
  let body;

  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const ip = getClientIp(req);
  const { allowed, message: rateLimitMessage } = await rateLimiter(ip);

  if (!allowed) {
    return NextResponse.json({ ok: false, error: rateLimitMessage }, { status: 429 });
  }

  const chatId = body?.message?.chat?.id;
  const commandText = body?.message?.text?.trim() || '';

  if (!commandText.startsWith('/reply:')) {
    return NextResponse.json({ ok: true, message: 'Ignored non-reply command.' }, { status: 200 });
  }

  const commandPayload = commandText.slice('/reply:'.length);
  const separatorIndex = commandPayload.indexOf('::');

  if (separatorIndex === -1) {
    const errorMessage = 'Invalid format. Use /reply:email::message';
    await notifyTelegram(chatId, `⚠️ ${errorMessage}`);
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 400 });
  }

  const email = commandPayload.slice(0, separatorIndex).trim();
  const replyMessage = commandPayload.slice(separatorIndex + 2).trim();
  const validationResult = telegramReplySchema.safeParse({
    email,
    message: replyMessage,
  });

  if (!validationResult.success) {
    const validationMessage =
      validationResult.error.issues[0]?.message || 'Invalid reply command.';

    await notifyTelegram(chatId, `⚠️ ${validationMessage}`);
    return NextResponse.json({ ok: false, error: validationMessage }, { status: 400 });
  }

  if (!resend) {
    console.error('Telegram reply email skipped because RESEND_EMAIL_API is missing.');
    return NextResponse.json(
      { ok: false, error: 'Email service is not configured.' },
      { status: 500 }
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Alok Kumar <contact@mail.whoisalok.tech>',
      to: validationResult.data.email,
      replyTo: 'alokkumar012148@gmail.com',
      subject: 'Reply from Alok Kumar regarding your message',
      react: <TelegramReplyTemplates replyText={validationResult.data.message} />,
      text: `${validationResult.data.message}\n\nBest regards,\nAlok Kumar\nhttps://whoisalok.tech`,
    });

    if (error) {
      console.error('Telegram reply email failed:', error);
      return NextResponse.json(
        { ok: false, error: 'Failed to send reply email.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Telegram webhook email send failed:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to send reply email.' },
      { status: 500 }
    );
  }

  try {
    await notifyTelegram(
      chatId,
      `✅ Reply sent successfully to <b>${validationResult.data.email}</b>.`
    );
  } catch (error) {
    console.error('Telegram webhook success notification failed:', error);
  }

  return NextResponse.json(
    { ok: true, message: 'Reply email sent successfully.' },
    { status: 200 }
  );
}
