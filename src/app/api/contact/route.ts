import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, userType, message, newsletter } = body;

    // TODO: Implement actual email sending logic here using a service like Resend, SendGrid, or Nodemailer.
    // Example with Resend (requires npm install resend):
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'WipeUp2026@gmail.com',
    //   subject: newsletter ? 'WipeUp Contact & Newsletter Subscription' : 'WipeUp Contact Form',
    //   text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nUser Type: ${userType}\n\nMessage:\n${message}\n\nNewsletter Subscription: ${newsletter ? 'Yes' : 'No'}`,
    // });

    console.log("Received contact form submission:", body);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ success: false, message: "Failed to send message" }, { status: 500 });
  }
}
