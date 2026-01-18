import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { email } = await request.json();

        // --- DEBUGGING LOGS ---
        console.log("Attempting to send email...");
        console.log("Using Email User:", process.env.EMAIL_USER); 
        // We log the LENGTH of the password to see if it's loading, but not the password itself for security
        console.log("Password Length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : "Undefined"); 
        // ----------------------

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("Missing Environment Variables");
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Make sure this matches Vercel exactly
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
    } catch (error) {
        console.error("FULL ERROR DETAILS:", error); // This puts the real error in the logs
        return NextResponse.json({ message: "Failed to send Email", error: error.message }, { status: 500 });
    }
}