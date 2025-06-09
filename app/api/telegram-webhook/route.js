import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_EMAIL_API);

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("➡️ Telegram webhook body received:", JSON.stringify(body, null, 2));

    const message = body?.message?.text || "";
    const chatId = body?.message?.chat?.id;
    const messageId = body?.message?.message_id;

    if (!message.startsWith("/reply:")) {
      console.log("ℹ️ Ignored message:", message);
      return NextResponse.json({ ok: true, message: "Ignored non-reply command" });
    }

    const [, content] = message.split("/reply:");
    if (!content || !content.includes("::")) {
      console.log("❌ Invalid format, missing '::'");
      return NextResponse.json({ ok: false, error: "Invalid format. Use /reply:email::message" }, { status: 400 });
    }

    const [emailRaw, replyRaw] = content.split("::");
    const email = emailRaw.trim();
    const replyText = replyRaw?.trim();

    if (!email || !replyText) {
      console.log("❌ Missing email or message");
      return NextResponse.json({ ok: false, error: "Missing email or message" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("❌ Invalid email format:", email);
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const html = `
      <p>${replyText}</p>
      <br>
      <p>Regards,<br>Alok Kumar<br><a href="https://whoisalok.tech">whoisalok.tech</a></p>
    `;

    const text = `${replyText}\n\nRegards,\nAlok Kumar\nhttps://whoisalok.tech`;

    console.log(`📧 Sending email to: ${email}`);
    const { data, error } = await resend.emails.send({
      from: "Alok Kumar <reply@mail.whoisalok.tech>",
      to: email,
      subject: "Reply from Alok - whoisalok.tech",
      html,
      text,
    });

    if (error) {
      console.error("❌ Resend email send error:", error.message);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    console.log("✅ Email sent via Resend:", data);
    return NextResponse.json({ ok: true, data });

  } catch (err) {
    console.error("❌ Webhook server error:", err.message);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
