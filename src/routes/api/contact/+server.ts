import type { RequestHandler } from "@sveltejs/kit";
import { verifyCaptcha } from "$lib/server/captcha";
import { sendContactEmail } from "$lib/server/mailer";

import { CAPTCHA_SECRET } from "$env/static/private";

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name")?.toString();
  const email = data.get("email")?.toString();
  const message = data.get("message")?.toString();
  const captchaSolution = data.get("cap-token")?.toString();

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
    await sendContactEmail({ name, email, message });
    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    console.error("Email error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong sending your message." }),
      { status: 500 },
    );
  }
};
