import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// ONLY PUT YOUR FREE PRODUCTS HERE
const FREE_PRODUCT_LINKS: Record<string, string> = {
    'ebook': 'https://drive.google.com/file/d/YOUR_REAL_EBOOK_LINK',
    'video': 'https://drive.google.com/file/d/YOUR_REAL_VIDEO_LINK',
    'checklist': 'https://drive.google.com/file/d/YOUR_REAL_CHECKLIST_LINK',
    'audio': 'https://drive.google.com/file/d/YOUR_REAL_AUDIO_LINK',
    'template': 'https://drive.google.com/file/d/YOUR_REAL_TEMPLATE_LINK',
};

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, product } = reqBody;

        // CHECK: Is this a free product with a link?
        const downloadLink = FREE_PRODUCT_LINKS[product];

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let mailOptions;

        if (downloadLink) {
            // --- SCENARIO A: FREE PRODUCT (Send Link) ---
            mailOptions = {
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
            // --- SCENARIO B: PREMIUM PRODUCT (Book a Spot) ---
            // If the product ID is not in the FREE list, we assume it's a Booking
            mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Spot Reserved: Confirmation',
                html: `
                    <div style="font-family: sans-serif; padding: 20px;">
                        <h2>You are on the list!</h2>
                        <p>Thank you for booking a spot for this exclusive product.</p>
                        <p>We have received your interest and will contact you shortly with the next steps.</p>
                        <br/>
                        <p><strong>Status:</strong> Confirmed ✅</p>
                    </div>
                `,
            };
        }

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: "Failed", error: error.message }, { status: 500 });
    }
}