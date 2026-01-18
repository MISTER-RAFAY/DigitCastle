// lib/nodemailer.ts
import nodemailer from 'nodemailer';

const email = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your preferred provider (Outlook, SMTP, etc.)
  auth: {
    user: email,
    pass: pass,
  },
});

export const mailOptions = {
  from: email,
};