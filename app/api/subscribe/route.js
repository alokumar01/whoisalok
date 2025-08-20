import { NextResponse } from "next/server";
import Newsletter from "@/lib/models/Newsletter";
import { z } from "zod";
import dbConnect from "@/lib/mongodb";
import { rateLimiter } from "@/lib/withRateLimit"; 
import { Resend } from "resend";
import { WelcomeTemplate } from "@/emails/WelcomeTemplate";
import SiteSetting from "@/lib/models/SiteSetting";

const resend = new Resend(process.env.RESEND_EMAIL_API);

// Track last Redis ping
let lastPing = 0;
const PING_INTERVAL = 30 * 60 * 1000; // 30 minutes

async function pingRedisIfNeeded() {
  const now = Date.now();
  if (now - lastPing > PING_INTERVAL) {
    try {
      const { redis } = await import("@/lib/withRateLimit"); // import your Redis instance
      await redis.ping();
      lastPing = now;
      console.log("Redis ping successful");
    } catch (err) {
      console.warn("Redis ping failed:", err.message);
    }
  }
}

const EmailSchema = z.object({
  email: z.string().email(),
});

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    // Ping Redis if needed
    await pingRedisIfNeeded();

    const { allowed, message } = await rateLimiter(ip);
    if (!allowed) {
      return NextResponse.json({ message }, { status: 429 });
    }

    const body = await req.json();
    const result = EmailSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const { email } = result.data;
    await dbConnect();

    const exist = await Newsletter.findOne({ email }).lean();
    if (exist) {
      return NextResponse.json({ message: "Already Subscribed, Use another Email!" }, { status: 400 });
    }

    await Newsletter.create({ email, subscribedAt: new Date() });

    // Check admin email sending control
    const setting = await SiteSetting.findById("global").lean();
    const emailsetting = setting?.emailSending ?? true;

    if (emailsetting) {
      try {
        await resend.emails.send({
          from: "Alok Kumar <welcome@mail.whoisalok.tech>",
          to: email,
          subject: 'Thanks for subscribing',
          react: <WelcomeTemplate />
        });
      } catch (error) {
        console.log("welcome email failed", error);
      }
    }

    return NextResponse.json({ message: "Successfully Subscribed!" });

  } catch (error) {
    console.log("Subscribed message: ", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
