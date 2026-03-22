import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import Newsletter from '@/lib/models/Newsletter';
import dbConnect from '@/lib/mongodb';
import { rateLimiter } from '@/lib/withRateLimit';
import { WelcomeTemplate } from '@/emails/WelcomeTemplate';
import SiteSetting from '@/lib/models/SiteSetting';
import { newsletterEmailSchema } from '@/lib/validations';

const resend = process.env.RESEND_EMAIL_API
  ? new Resend(process.env.RESEND_EMAIL_API)
  : null;

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    const { allowed, message } = await rateLimiter(ip);
    if (!allowed) {
      return NextResponse.json({ message }, { status: 429 });
    }

    const body = await req.json();
    const result = newsletterEmailSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
    }

    const { email } = result.data;
    await dbConnect();

    const exist = await Newsletter.findOne({ email }).lean();
    if (exist) {
      return NextResponse.json(
        { message: 'Already subscribed. Please use another email address.' },
        { status: 400 }
      );
    }

    await Newsletter.create({ email, subscribedAt: new Date() });

    const setting = await SiteSetting.findById('global').lean();
    const emailsetting = setting?.emailSending ?? true;

    if (emailsetting && resend) {
      try {
        await resend.emails.send({
          from: 'Alok Kumar <welcome@mail.whoisalok.tech>',
          to: email,
          subject: 'Thanks for subscribing',
          react: <WelcomeTemplate />,
        });
      } catch (error) {
        console.error('Welcome email failed:', error);
      }
    } else if (emailsetting) {
      console.error('Welcome email skipped because RESEND_EMAIL_API is missing.');
    }

    return NextResponse.json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Newsletter subscription failed:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
