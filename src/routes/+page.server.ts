import type { Actions } from "@sveltejs/kit";
import nodemailer from 'nodemailer';
import { MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_SECURE, MAIL_USER, CONTACT_RECEIVER } from "$env/static/private";


export const actions: Actions = {


  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();
    const message = data.get('message')?.toString();

    if (!name || !email || !message) {
      return { success: false, error: 'Please fill in all fields.' };
    }

    try {
      const transporter = nodemailer.createTransport({
        host: MAIL_HOST,
        port: Number(MAIL_PORT),
        secure: MAIL_SECURE === 'true',
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASS
        }
      });

      await transporter.sendMail({
        from: MAIL_USER,
        to: CONTACT_RECEIVER,
        subject: '📬 New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      });

      return { success: true };
    } catch (err) {
      console.error('Email send error:', err);
      return { success: false, error: 'Something went wrong sending your message.' };
    }
  }
};
