import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";
import Newsletter from "@/lib/models/Newsletter";
import { z } from "zod";
import dbConnect from "@/lib/mongodb";
import { rateLimiter } from "@/lib/withRateLimit";  // <-- import your rate limiter

const EmailSchema = z.object({
  email: z.string().email(),
});

export async function POST(req) {
    try {
        // Extract IP (from header or fallback)
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

        // Run the rate limiter with IP
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
        return NextResponse.json({ message: "Already Subscribed, Use another" }, { status: 400 });
        }

        await Newsletter.create({
        email,
        subscribedAt: new Date(),
        });

        return NextResponse.json({ message: "Successfully Subscribed!" });
    } catch (error) {
        console.log("Subscribed message: ", error);

    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
