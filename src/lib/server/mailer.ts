import nodemailer from "nodemailer";
import {
  MAIL_HOST,
  MAIL_PASS,
  MAIL_PORT,
  MAIL_SECURE,
  MAIL_USER,
  CONTACT_RECEIVER,
} from "$env/static/private";

if (!MAIL_HOST || !MAIL_PORT || !MAIL_USER || !MAIL_PASS || !CONTACT_RECEIVER) {
  throw new Error("Missing required mail environment variables");
}

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: Number(MAIL_PORT),
  secure: MAIL_SECURE === "true",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

type ContactFormInput = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactEmail({
  name,
  email,
  message,
}: ContactFormInput) {
  await transporter.sendMail({
    from: MAIL_USER,
    to: CONTACT_RECEIVER,
    subject: "📬 New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });
}
