import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// 1. DEFINE YOUR PRODUCTS HERE
const PRODUCT_LINKS: any = {
    'ebook': 'https://drive.google.com/file/d/1uvCN3fvj-wsVymfr-PlKLuU4ZBgpLaFH/view?usp=sharing',
    'video': 'https://drive.google.com/file/d/15VqhAe-HiB5mTvR0W-xYl9fG77F4EGTU/view?usp=sharing',
    'AI Prompts Pack': 'https://drive.google.com/file/d/17lsMFY3_AF6kaC5u5FMhUN0NIATMqdwq/view?usp=drive_link',
    'website template': 'https://drive.google.com/file/d/1mA9HN8u5gAjYVYUiVAfayXwQgrxO0tuy/view?usp=drive_link',
    'Lead Magnet template': 'https://drive.google.com/file/d/1C7zO4E2LQVgEMUObM6jhkK_OWoHk9AkR/view?usp=sharing',
};

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, product } = reqBody; // We now get 'product' from the frontend

        // 2. FIND THE CORRECT LINK
        // If they didn't send a product name, default to the first one, or a generic page
        const downloadLink = PRODUCT_LINKS[product] || 'https://your-website.com';
        
        // Optional: Customize the subject line based on product
        const subjectLine = `Here is your ${product || 'Free Download'}`;

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
            subject: subjectLine,
            html: `
                <h1>Here is your requested file</h1>
                <p>Click the button below to download:</p>
                <a href="${downloadLink}" style="padding: 10px 20px; background-color: green; color: white; text-decoration: none;">Download Now</a>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: "Failed", error: error.message }, { status: 500 });
    }
}