import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, userType, message, newsletter } = body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // משתמש ב-SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // וודא שזו ה-App Password
      },
    });

    const subject = newsletter ? "WipeUp Contact & Newsletter Subscription" : "WipeUp Contact Form";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'wipeup2026@gmail.com',
      replyTo: email,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nUser Type: ${userType}\n\nMessage:\n${message}\n\nNewsletter Subscription: ${newsletter ? 'Yes' : 'No'}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ success: false, message: "Failed to send message" }, { status: 500 });
  }
}
