import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { getSecurityHeaders } from '$lib/server/security';

export const GET: RequestHandler = async () => {
  const headers = getSecurityHeaders();

  return json({
    message: 'Security Headers Test',
    csp: headers['Content-Security-Policy'],
    timestamp: new Date().toISOString()
  });
};
