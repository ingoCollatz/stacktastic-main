import nodemailer from "nodemailer";
import { env } from "$env/dynamic/private";

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
  const MAIL_SECURE = env.MAIL_SECURE;
  const MAIL_HOST = env.MAIL_HOST;
  const MAIL_PORT = env.MAIL_PORT;
  const MAIL_USER = env.MAIL_USER;
  const MAIL_PASS = env.MAIL_PASS;
  const CONTACT_RECEIVER = env.CONTACT_RECEIVER;

  if (
    !MAIL_HOST ||
    !MAIL_PORT ||
    !MAIL_USER ||
    !MAIL_PASS ||
    !CONTACT_RECEIVER
  ) {
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

  await transporter.sendMail({
    from: MAIL_USER,
    to: CONTACT_RECEIVER,
    subject: "📬 New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });
}
