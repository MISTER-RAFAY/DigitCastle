import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        // In TypeScript, we await the json() method
        const reqBody = await request.json();
        const { email } = reqBody;

        // --- DEBUGGING LOGS (Check Vercel Logs for these) ---
        console.log("DEBUG: Email User is:", process.env.EMAIL_USER);
        // We check length to see if password exists without revealing it
        console.log("DEBUG: Password length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : "Missing"); 

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("Missing Environment Variables");
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Here is your Free Download',
            text: 'Here is your link: https://your-link.com',
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });

    } catch (error: any) {
        console.error("DEBUG: Full Error:", error);
        return NextResponse.json({ message: "Failed", error: error.message }, { status: 500 });
    }
}