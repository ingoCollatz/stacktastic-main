import type { RequestHandler } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export const GET: RequestHandler = async () => {
  // Only allow this in non-production environments
  if (env.NODE_ENV === "production" && !env.DEBUG_MODE) {
    return new Response("Not allowed", { status: 403 });
  }

  const envStatus = {
    NODE_ENV: env.NODE_ENV,
    CAPTCHA_SECRET: env.CAPTCHA_SECRET ? `Set (${env.CAPTCHA_SECRET.length} chars)` : "NOT SET",
    VITE_CAPTCHA_SECRET: env.VITE_CAPTCHA_SECRET ? `Set (${env.VITE_CAPTCHA_SECRET.length} chars)` : "NOT SET",
    CONTACT_RECEIVER: env.CONTACT_RECEIVER ? `Set (${env.CONTACT_RECEIVER.length} chars)` : "NOT SET",
    MAIL_HOST: env.MAIL_HOST ? `Set (${env.MAIL_HOST.length} chars)` : "NOT SET",
    MAIL_PORT: env.MAIL_PORT ? `Set (${env.MAIL_PORT.length} chars)` : "NOT SET",
    MAIL_USER: env.MAIL_USER ? `Set (${env.MAIL_USER.length} chars)` : "NOT SET",
    MAIL_PASS: env.MAIL_PASS ? "Set (hidden)" : "NOT SET",
    CSRF_SECRET: env.CSRF_SECRET ? `Set (${env.CSRF_SECRET.length} chars)` : "NOT SET",
  };

  return new Response(JSON.stringify(envStatus, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
