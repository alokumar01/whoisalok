import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { ReplyTemplate } from "../telegram-webhook/ReplyTemplate.jsx";

const resend = new Resend(process.env.RESEND_EMAIL_API);

export async function POST(req) {
  try {
    const body = await req.json();
    const message = body?.message?.text;

    if (message && message.includes("reply:")) {
      const [_, emailPart] = message.split("reply:");
      const [email, replyText] = emailPart.split("::");

      const html = render(<ReplyTemplate replyText={replyText.trim()} />);

      await resend.emails.send({
        from: "Alok Kumar <reply@mail.whoisalok.tech>",
        to: email.trim(),
        subject: "Reply from Alok - whoisalok.tech",
        html,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
