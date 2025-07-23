import type { RequestHandler } from '@sveltejs/kit';
import { generateCSRFToken } from '$lib/server/csrf';

export const GET: RequestHandler = async () => {
  const token = generateCSRFToken();

  return new Response(JSON.stringify({ token }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
