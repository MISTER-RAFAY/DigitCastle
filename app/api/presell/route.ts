import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        console.log("Attempting to send using Hardcoded Credentials...");

        // --- HARDCODED CREDENTIALS (DELETE AFTER TESTING) ---
        // Note: I removed the spaces from your password automatically below
        const TEMP_USER = 'DigitXservices123@gmail.com'; 
        const TEMP_PASS = 'vcszueepjkmuntsq'; 
        // -----------------------------------------------------

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: TEMP_USER,
                pass: TEMP_PASS,
            },
        });

        const mailOptions = {
            from: TEMP_USER,
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