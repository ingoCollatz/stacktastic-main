import type { RequestHandler } from "@sveltejs/kit";
import nodemailer from "nodemailer";
import { FriendlyCaptchaClient } from "@friendlycaptcha/server-sdk";
import dotenv from "dotenv";

dotenv.config();

const CONTACT_RECEIVER = process.env.CONTACT_RECEIVER!;
const MAIL_HOST = process.env.MAIL_HOST!;
const MAIL_PORT = process.env.MAIL_PORT!;
const MAIL_SECURE = process.env.MAIL_SECURE!;
const MAIL_USER = process.env.MAIL_USER!;
const MAIL_PASS = process.env.MAIL_PASS!;
const API_KEY_FRIENDLY_CAPTCHA = process.env.API_KEY_FRIENDLY_CAPTCHA!;
const FRIENDLY_CAPTCHA_SECRET = process.env.FRIENDLY_CAPTCHA_SECRET!;

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name")?.toString();
  const email = data.get("email")?.toString();
  const message = data.get("message")?.toString();
  const captchaSolution = data.get("frc-captcha-solution")?.toString();

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: "Please fill in all fields." }),
      { status: 400 }
    );
  }

  if (!captchaSolution) {
    return new Response(JSON.stringify({ error: "CAPTCHA is missing." }), {
      status: 400,
    });
  }

  try {
    const friendlyCaptcha = new FriendlyCaptchaClient({
      apiKey: API_KEY_FRIENDLY_CAPTCHA,
      sitekey: FRIENDLY_CAPTCHA_SECRET,
    });

    const verificationResult =
      await friendlyCaptcha.verifyCaptchaResponse(captchaSolution);

    if (!verificationResult.response?.success) {
      console.error("CAPTCHA verification failed:", verificationResult);
      return new Response(
        JSON.stringify({ error: "CAPTCHA validation failed." }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying CAPTCHA:", error);
    return new Response(
      JSON.stringify({ error: "CAPTCHA validation error." }),
      { status: 500 }
    );
  }

  try {
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

    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    console.error("Email send error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong sending your message." }),
      { status: 500 }
    );
  }
};
