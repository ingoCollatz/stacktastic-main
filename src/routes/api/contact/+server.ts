import type { RequestHandler } from "@sveltejs/kit";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const CONTACT_RECEIVER = process.env.CONTACT_RECEIVER!;
const MAIL_HOST = process.env.MAIL_HOST!;
const MAIL_PORT = process.env.MAIL_PORT!;
const MAIL_SECURE = process.env.MAIL_SECURE!;
const MAIL_USER = process.env.MAIL_USER!;
const MAIL_PASS = process.env.MAIL_PASS!;
const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET!;


interface CaptchaVerificationResponse {
  success: boolean;
  challenge_ts?: string;  // timestamp of the challenge
  hostname?: string;      // hostname where CAPTCHA was solved
  [key: string]: unknown; // allow extra unknown fields
}


async function verifyCaptcha(
  url: string,
  secret: string,
  token: string
): Promise<CaptchaVerificationResponse> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      response: token,
    }),
  });

  if (!res.ok) {
    throw new Error(`CAPTCHA verification failed with status ${res.status}`);
  }

  return res.json() as Promise<CaptchaVerificationResponse>;
}


export const POST: RequestHandler = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name")?.toString();
  const email = data.get("email")?.toString();
  const message = data.get("message")?.toString();
  const captchaSolution = data.get("cap-token")?.toString();

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: "Please fill in all fields." }),
      { status: 400 }
    );
  }

  if (!captchaSolution) {
    return new Response(
      JSON.stringify({ error: "CAPTCHA is missing." }),
      { status: 400 }
    );
  }


  try {
    const captchaResult = await verifyCaptcha(
      `https://capjs.stacktastic.dev/${CAPTCHA_SECRET}/siteverify`,
      process.env.CAPTCHA_SECRET!,
      captchaSolution
    );

    if (!captchaResult.success) {
      console.error("CAPTCHA verification failed:", captchaResult);
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

  // Email sending code unchanged...
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
