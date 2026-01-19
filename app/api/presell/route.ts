import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// YOUR FREE PRODUCT LINKS
const FREE_PRODUCT_LINKS: Record<string, string> = {
    'eb-1': 'https://drive.google.com/file/d/1uvCN3fvj-wsVymfr-PlKLuU4ZBgpLaFH/view?usp=drive_link',
    'oc-2': 'https://drive.google.com/file/d/15VqhAe-HiB5mTvR0W-xYl9fG77F4EGTU/view?usp=drive_link',
    'ai-2': 'https://drive.google.com/file/d/17lsMFY3_AF6kaC5u5FMhUN0NIATMqdwq/view?usp=drive_link',
    'lm-1': 'https://drive.google.com/file/d/1C7zO4E2LQVgEMUObM6jhkK_OWoHk9AkR/view?usp=drive_link',
    'wt-2': 'https://drive.google.com/file/d/1mA9HN8u5gAjYVYUiVAfayXwQgrxO0tuy/view?usp=drive_link',
};

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, product } = reqBody;

        // Check if it is Free or Premium logic
        const downloadLink = FREE_PRODUCT_LINKS[product];
        const isFree = !!downloadLink; // true if free, false if premium

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // --- 1. PREPARE EMAIL FOR THE USER ---
        let userMailOptions;

        if (isFree) {
            // Free Download Email
            userMailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Here is your Free Download',
                html: `
                    <div style="font-family: sans-serif; padding: 20px;">
                        <h2>Your download is ready!</h2>
                        <p>Click the button below to get your file:</p>
                        <a href="${downloadLink}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Download Now</a>
                    </div>
                `,
            };
        } else {
            // Premium Booking Email
            userMailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Spot Reserved: Confirmation',
                html: `
                    <div style="font-family: sans-serif; padding: 20px;">
                        <h2>You are on the list!</h2>
                        <p>Thank you for booking a spot for: <strong>${product}</strong>.</p>
                        <p>We have received your interest and will contact you shortly.</p>
                    </div>
                `,
            };
        }

        // --- 2. PREPARE EMAIL FOR THE ADMIN (YOU) ---
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Sends TO yourself
            subject: `🔔 New Lead: ${email}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd;">
                    <h3>New Submission Received!</h3>
                    <p><strong>User Email:</strong> ${email}</p>
                    <p><strong>Product Interest:</strong> ${product}</p>
                    <p><strong>Action Type:</strong> ${isFree ? 'Downloaded Freebie' : 'Booked a Spot'}</p>
                    <hr/>
                    <p><em>Check your database or follow up with this user.</em></p>
                </div>
            `,
        };

        // --- 3. SEND BOTH EMAILS ---
        // We use Promise.all to send them at the same time
        await Promise.all([
            transporter.sendMail(userMailOptions),
            transporter.sendMail(adminMailOptions)
        ]);

        return NextResponse.json({ message: "Emails Sent Successfully" }, { status: 200 });

    } catch (error: any) {
        console.error("Email Error:", error);
        return NextResponse.json({ message: "Failed", error: error.message }, { status: 500 });
    }
}