const escapeTelegramHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export function formatContactTelegramMessage({ name, email, message, timestamp }) {
  const safeTimestamp = timestamp instanceof Date ? timestamp.toISOString() : new Date(timestamp).toISOString();

  return [
    '📬 <b>New Contact Message</b>',
    '',
    `<b>Name:</b> ${escapeTelegramHtml(name)}`,
    `<b>Email:</b> ${escapeTelegramHtml(email)}`,
    `<b>Timestamp:</b> ${escapeTelegramHtml(safeTimestamp)}`,
    '',
    '<b>Message:</b>',
    escapeTelegramHtml(message),
  ].join('\n');
}

export async function sendTelegramMessage(message, options = {}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = options.chatId || process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Telegram message skipped because TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing.');
    return { ok: false, error: 'Telegram configuration missing.' };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      const errorMessage = data?.description || 'Telegram API request failed.';
      console.error('Telegram API error:', errorMessage);
      return { ok: false, error: errorMessage };
    }

    return { ok: true, data };
  } catch (error) {
    console.error('Telegram message send failed:', error);
    return { ok: false, error: error.message };
  }
}
