import type { Handle } from '@sveltejs/kit';
import { getSecurityHeaders } from '$lib/server/security';

export const handle: Handle = async ({ event, resolve }) => {
  // Add security headers to all responses
  const response = await resolve(event);

  // Apply security headers
  const securityHeaders = getSecurityHeaders();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
};
