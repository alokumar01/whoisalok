import { NextResponse } from "next/server";
import { Resend } from "resend";
import ReplyTemplate from "@/emails/ReplyTemplate";
import { sendTelegramMessage } from "@/lib/sendTegramMessage";

const resend = new Resend(process.env.RESEND_EMAIL_API);

export async function POST(req) {
  try {
    const body = await req.json();
    const message = body?.message?.text;

    if (!message || typeof message !== "string") {
      await sendTelegramMessage("❌ Error: No valid message received in webhook.");
      return NextResponse.json({ ok: false, error: "Invalid message" }, { status: 400 });
    }

    if (!message.startsWith("reply:")) {
      return NextResponse.json({ ok: true, message: "Ignored: Not a reply command" });
    }

    const [, emailPart] = message.split("reply:");
    if (!emailPart || !emailPart.includes("::")) {
      await sendTelegramMessage("❌ Error: Invalid reply format. Use: reply:email::message");
      return NextResponse.json({ ok: false, error: "Invalid reply format" }, { status: 400 });
    }

    const [emailRaw, replyRaw] = emailPart.split("::");
    const email = emailRaw?.trim();
    const replyText = replyRaw?.trim();

    if (!email || !replyText) {
      await sendTelegramMessage("❌ Error: Missing email or reply text. Use: reply:email::message");
      return NextResponse.json({ ok: false, error: "Missing email or reply text" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      await sendTelegramMessage(`❌ Error: Invalid email address: ${email}`);
      return NextResponse.json({ ok: false, error: "Invalid email address" }, { status: 400 });
    }

    // ✅ Send using react (not html string)
    const { error } = await resend.emails.send({
      from: "Alok Kumar <reply@mail.whoisalok.tech>",
      to: email,
      subject: "Reply from Alok - whoisalok.tech",
      react: <ReplyTemplate replyText={replyText} />,
      text: `Dear Valued Contact,\n\n${replyText}\n\nI appreciate your interest and will get back to you as soon as possible.\nFeel free to explore my portfolio: https://whoisalok.tech\n\nBest regards,\nAlok Kumar\n\nThis is an automated response. Please do not reply directly to this email.`,
    });

    if (error) {
      await sendTelegramMessage(`❌ Failed to send email to ${email}: ${error.message}`);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    await sendTelegramMessage(`✅ Email sent successfully to ${email}`);
    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("Webhook error:", err);
    await sendTelegramMessage(`❌ Webhook error: ${err.message}`);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
