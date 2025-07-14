// src/routes/api/contact/+server.ts

import type { RequestHandler } from "@sveltejs/kit";
import nodemailer from "nodemailer";
import { FriendlyCaptchaClient } from "@friendlycaptcha/server-sdk";
import {
  CONTACT_RECEIVER,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_SECURE,
  MAIL_USER,
  API_KEY_FRIENDLY_CAPTCHA,
  FRIENDLY_CAPTCHA_SECRET,
  MAIL_PASS,
} from "$env/static/private";

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name")?.toString();
  const email = data.get("email")?.toString();
  const message = data.get("message")?.toString();
  const captchaSolution = data.get("frc-captcha-solution")?.toString();

  console.log("env:", {
    CONTACT_RECEIVER,
    MAIL_HOST,
    MAIL_PORT,
    MAIL_SECURE,
    MAIL_USER,
    API_KEY_FRIENDLY_CAPTCHA,
    FRIENDLY_CAPTCHA_SECRET,
  });

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: "Please fill in all fields." }),
      { status: 400 },
    );
  }

  if (!captchaSolution) {
    return new Response(JSON.stringify({ error: "CAPTCHA is missing." }), {
      status: 400,
    });
  }

  // ✅ Verify CAPTCHA
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
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error verifying CAPTCHA:", error);
    return new Response(
      JSON.stringify({ error: "CAPTCHA validation error." }),
      { status: 500 },
    );
  }

  // ✅ Send email
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
      { status: 500 },
    );
  }
};
