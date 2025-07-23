import type { RequestHandler } from "@sveltejs/kit";
import { verifyCaptcha } from "$lib/server/captcha";
import { sendContactEmail } from "$lib/server/mailer";
import { sanitizeInput } from "$lib/server/sanitization";
import { checkRateLimit } from "$lib/server/local-redis-ratelimit";
import { verifyCSRFToken } from "$lib/server/csrf";

import { env } from "$env/dynamic/private";

const CAPTCHA_SECRET = env.CAPTCHA_SECRET;

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const clientIP = getClientAddress();

  // Rate limiting check
  const rateLimitResult = await checkRateLimit(clientIP, "contact");
  if (!rateLimitResult.success) {
    return new Response(
      JSON.stringify({
        error: "Too many requests. Please try again later.",
      }),
      { status: 429 },
    );
  }

  const data = await request.formData();
  const name = data.get("name")?.toString();
  const email = data.get("email")?.toString();
  const message = data.get("message")?.toString();
  const captchaSolution = data.get("cap-token")?.toString();
  const csrfToken = data.get("csrf-token")?.toString();

  // Basic validation
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: "Please fill in all fields." }),
      { status: 400 },
    );
  }

  // CSRF validation
  if (!csrfToken || !verifyCSRFToken(csrfToken)) {
    return new Response(
      JSON.stringify({
        error: "Invalid request. Please refresh the page and try again.",
      }),
      { status: 403 },
    );
  }

  // Input validation and length checks
  if (name.length > 100) {
    return new Response(
      JSON.stringify({ error: "Name must be less than 100 characters." }),
      { status: 400 },
    );
  }

  if (email.length > 254) {
    return new Response(
      JSON.stringify({ error: "Email must be less than 254 characters." }),
      { status: 400 },
    );
  }

  if (message.length > 2000) {
    return new Response(
      JSON.stringify({ error: "Message must be less than 2000 characters." }),
      { status: 400 },
    );
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: "Please enter a valid email address." }),
      { status: 400 },
    );
  }

  // Sanitize inputs before processing
  const sanitizedName = sanitizeInput(name);
  const sanitizedEmail = sanitizeInput(email);
  const sanitizedMessage = sanitizeInput(message);

  // Simple spam detection
  const spamKeywords = [
    "viagra",
    "cialis",
    "casino",
    "lottery",
    "winner",
    "congratulations",
    "click here",
    "make money",
    "free money",
  ];
  const messageText = sanitizedMessage.toLowerCase();
  const hasSpamKeywords = spamKeywords.some((keyword) =>
    messageText.includes(keyword),
  );

  if (hasSpamKeywords) {
    return new Response(
      JSON.stringify({ error: "Message contains prohibited content." }),
      { status: 400 },
    );
  }

  // Check for suspicious patterns
  const excessiveRepetition = /(.)\1{10,}/.test(sanitizedMessage);
  const allCapsRatio =
    (sanitizedMessage.match(/[A-Z]/g) || []).length / sanitizedMessage.length;

  if (
    excessiveRepetition ||
    (sanitizedMessage.length > 10 && allCapsRatio > 0.7)
  ) {
    return new Response(
      JSON.stringify({ error: "Message appears to be spam." }),
      { status: 400 },
    );
  }

  // CAPTCHA validation (keeping this as primary anti-bot measure)
  if (!captchaSolution) {
    return new Response(JSON.stringify({ error: "CAPTCHA is missing." }), {
      status: 400,
    });
  }

  try {
    const captchaResult = await verifyCaptcha(
      `https://capjs.stacktastic.dev/ffeb0d0477/siteverify`,
      CAPTCHA_SECRET!,
      captchaSolution,
    );

    if (!captchaResult.success) {
      console.error("CAPTCHA verification failed:", captchaResult);
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

  try {
    // Use sanitized inputs for email
    await sendContactEmail({
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
    });
    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    console.error("Email error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong sending your message." }),
      { status: 500 },
    );
  }
};
