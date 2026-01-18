import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, productInterest, isFree, fileUrl } = body;

    // Get website link
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const fullDownloadLink = `${origin}${fileUrl}`;

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    // --- LOGIC: PREMIUM vs FREE ---

    if (isFree) {
        // 🟢 SCENARIO 1: FREE PRODUCT -> SEND FILE
        console.log(`Sending FILE to ${email}`);
        
        await transporter.sendMail({
            from: user,
            to: email,
            subject: `Your Download: ${productInterest}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
                <h2 style="color: #059669;">Here is your download! 🎁</h2>
                <p>Hi there,</p>
                <p>Thank you for requesting <strong>${productInterest}</strong>.</p>
                <br/>
                <a href="${fullDownloadLink}" style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Download File Now
                </a>
                <br/><br/>
                <p style="font-size: 12px; color: #6b7280;">If the button doesn't work, copy this link: ${fullDownloadLink}</p>
              </div>
            `,
        });

    } else {
        // 🟣 SCENARIO 2: PREMIUM PRODUCT (BOOK SPOT) -> NO FILE
        console.log(`Sending WAITLIST CONFIRMATION to ${email}`);

        await transporter.sendMail({
            from: user,
            to: email,
            subject: `You are on the list! - ${productInterest}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
                <h2 style="color: #4F46E5;">Spot Secured! 🚀</h2>
                <p>Hi there,</p>
                <p>You have successfully reserved your spot for <strong>${productInterest}</strong>.</p>
                <p>This is a Premium product that is currently in development.</p>
                <p><strong>We will email you as soon as it launches with your exclusive access link.</strong></p>
                <br/>
                <p>Best,<br/>The LaunchPad Team</p>
              </div>
            `,
        });
    }

    // Notify Admin (You)
    await transporter.sendMail({
      from: user,
      to: user,
      subject: `New Lead (${isFree ? 'Free Download' : 'Premium Waitlist'})`,
      text: `${email} is interested in ${productInterest}.`,
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });

  } catch (error) {
    console.error('Email Error:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}