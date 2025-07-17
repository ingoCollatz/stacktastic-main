export interface CaptchaVerificationResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  [key: string]: unknown;
}

export async function verifyCaptcha(
  url: string,
  secret: string,
  token: string,
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
