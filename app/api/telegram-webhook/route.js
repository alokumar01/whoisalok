// app/api/telegram-webhook/route.js

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_EMAIL_API);

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Telegram Webhook Triggered:", body);

    const message = body?.message?.text;
    const chatId = body?.message?.chat?.id;

    // If message starts with reply:
    if (message && message.startsWith("reply:")) {
      const [_, emailPart] = message.split("reply:");
      const [email, replyText] = emailPart.split("::");

      if (email && replyText) {
        await resend.emails.send({
          from: "Alok Kumar <reply@mail.whoisalok.tech>",
          to: email.trim(),
          subject: "Reply from Alok – whoisalok.tech",
          text: replyText.trim(),
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
