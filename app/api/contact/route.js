import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { rateLimiter } from "@/lib/withRateLimit";
import Contactform from "@/lib/models/Contactform";
import { z } from "zod";
import { sendTelegramMessage } from "@/lib/sendTegramMessage";
import { Resend } from "resend";
import { ContactThanksTemplate } from "@/emails/ContactThanksTemplate";

const resend = new Resend(process.env.RESEND_EMAIL_API);

const ContactformSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    message: z.string().min(1, "Message is required"),
});

export async function POST(req) {
    try {
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

        const { allowed, message: rateLimitMessage } = await rateLimiter(ip);

        if (!allowed) {
            return NextResponse.json({ message: rateLimitMessage }, {status: 429})
        }

        const body = await req.json();
        const result =  ContactformSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json({ message: "Invalid input"} , { status: 400 });
        }

        const { name, email, message } = result.data;
        await dbConnect();

        await Contactform.create({ 
            name, 
            email, 
            message, 
            messagedAt: new Date(), 
        })

        
        // Sending data to telegram bot
        await sendTelegramMessage (
            `📬 <b>New Contact Message</b>\n\n👤 <b>Name:</b> ${name}\n📧 <b>Email:</b> ${email}\n📝 <b>Message:</b>\n${message}`
        );
        
        // await resend.emails.send({
        //     from: "Alok Kumar <notify@mail.whoisalok.tech>",
        //     to: email,
        //     subject: "Thanks for contacting me!",
        //     react: <ContactThanksTemplate name={name} />,
        // });


        return NextResponse.json({ message: "Successfully Sent Message" })

    } catch (error) {
        console.log("message sent successfully: ", error);

        return NextResponse.json({ message: "Something went wrong" }, {status: 500 });
    }
}