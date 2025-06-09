import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/components";
import { TelegramReplyTemplates } from "@/emails/TelegramReplyTemplates";

const resend = new Resend(process.env.RESEND_EMAIL_API);

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Telegram webhook body received:", JSON.stringify(body, null, 2));

    const message = body?.message?.text || "";
    if (!message.startsWith("/reply:")) {
      console.log("Ignored message:", message);
      return NextResponse.json({ ok: true, message: "Ignored non-reply command" });
    }

    const [, content] = message.split("/reply:");
    if (!content || !content.includes("::")) {
      return NextResponse.json({ ok: false, error: "Invalid format. Use /reply:email::message" }, { status: 400 });
    }

    const [emailRaw, replyRaw] = content.split("::");
    const email = emailRaw.trim();
    const replyText = replyRaw?.trim();

    if (!email || !replyText) {
      return NextResponse.json({ ok: false, error: "Missing email or message" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email format" }, { status: 400 });
    }

    const html = await render(<TelegramReplyTemplates replyText={replyText} />, { pretty: true });
    const text = `${replyText}\n\nRegards,\nAlok Kumar\nhttps://whoisalok.tech`;

    const { data, error } = await resend.emails.send({
      from: "Alok Kumar <contact@mail.whoisalok.tech>",
      to: email,
      reply_to: "alokkumar012148@gmail.com", 
      subject: "Reply from Alok - ",
      html,
      text,
    });


    if (error) {
      console.error("❌ Resend email error:", error.message);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });

  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
