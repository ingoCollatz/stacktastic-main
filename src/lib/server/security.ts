export interface SecurityHeaders {
  [key: string]: string;
}

export function getSecurityHeaders(): SecurityHeaders {
  const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;

  const headers: SecurityHeaders = {
    // Prevent XSS attacks
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',

    // HTTPS enforcement
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

    // Content Security Policy - Allow JSDelivr for CAPTCHA dependencies
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' blob: https://capjs.stacktastic.dev https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self' https://capjs.stacktastic.dev https://cdn.jsdelivr.net",
      "worker-src 'self' blob:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; '),

    // Referrer policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',

    // Permissions policy
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()'
    ].join(', ')
  };

  // Add cache-busting headers for development to prevent CSP caching issues
  if (isDev) {
    headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    headers['Pragma'] = 'no-cache';
    headers['Expires'] = '0';
  }

  return headers;
}

export function addSecurityHeaders(response: Response): Response {
  const headers = getSecurityHeaders();

  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export function createSecureResponse(
  data: object | string,
  status: number = 200,
  additionalHeaders?: Record<string, string>
): Response {
  const body = typeof data === 'string' ? data : JSON.stringify(data);
  const contentType = typeof data === 'string' ? 'text/plain' : 'application/json';

  const response = new Response(body, {
    status,
    headers: {
      'Content-Type': contentType,
      ...getSecurityHeaders(),
      ...additionalHeaders,
    },
  });

  return response;
}
