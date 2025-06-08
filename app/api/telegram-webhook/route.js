// app/api/telegram-webhook/route.js

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ReplyTemplate } from "@/emails/replyTemplate";
import { renderAsync } from "@resend/react";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_EMAIL_API);

export async function POST(req) {
  try {
    const body = await req.json();
    const message = body?.message?.text;

    if (message && message.includes("reply:")) {
      const [_, emailPart] = message.split("reply:");
      const [email, replyText] = emailPart.split("::");

      console.log("before")
      const html = await render(<ReplyTemplate replyText={replyText.trim()} />);
      console.log(html);
      console.log("after")

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
