import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Using Vercel variable (Safe)
                pass: process.env.EMAIL_PASS, // Using Vercel variable (Safe)
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Here is your Free Download',
            text: 'Here is your link: https://drive.google.com/drive/folders/113MS9JEk1_VFEQIW2plb_UskqeD7GWVM?usp=sharing',
            html:'<p>Click here to download:<a href="https://drive.google.com/drive/folders/113MS9JEk1_VFEQIW2plb_UskqeD7GWVM?usp=sharing">Download Now<p>',
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });

    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Failed", error: error.message }, { status: 500 });
    }
}