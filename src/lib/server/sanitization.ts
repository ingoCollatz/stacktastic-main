// Simple, reliable server-side sanitization without browser dependencies
// This avoids ES module bundling issues with DOMPurify/jsdom in production

// Simple HTML tag removal regex
const HTML_TAG_REGEX = /<[^>]*>/g;
const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const STYLE_REGEX = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi;

export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  // Remove script and style tags first (most dangerous)
  let cleaned = input.replace(SCRIPT_REGEX, "").replace(STYLE_REGEX, "");

  // Remove all HTML tags but keep content
  cleaned = cleaned.replace(HTML_TAG_REGEX, "");

  // Remove control characters (except newlines, tabs, carriage returns)
  // eslint-disable-next-line no-control-regex
  cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // Normalize unicode
  cleaned = cleaned.normalize("NFC");

  // Limit length
  if (cleaned.length > 10000) {
    cleaned = cleaned.substring(0, 10000);
  }

  return cleaned.trim();
}

export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== "string") {
    return "";
  }

  // Basic email sanitization - remove dangerous characters
  return email
    .trim()
    .toLowerCase()
    .slice(0, 254) // RFC 5321 limit
    .replace(/[^\w@.-]/g, "") // Only allow word chars, @, ., and -
    .normalize("NFC");
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

export function validateInput(
  input: string,
  maxLength: number = 5000,
): boolean {
  if (!input || typeof input !== "string") {
    return false;
  }

  return (
    input.trim().length > 0 &&
    input.length <= maxLength &&
    !input.includes("\0")
  ); // No null bytes
}

// Additional validation for contact form
export interface ContactFormValidation {
  name: string;
  email: string;
  message: string;
  isValid: boolean;
  errors: string[];
}

export function validateContactForm(
  name: string,
  email: string,
  message: string,
): ContactFormValidation {
  const errors: string[] = [];

  // Sanitize inputs
  const sanitizedName = sanitizeInput(name);
  const sanitizedEmail = sanitizeEmail(email);
  const sanitizedMessage = sanitizeInput(message);

  // Validate name
  if (!validateInput(sanitizedName, 100)) {
    errors.push("Name is required and must be less than 100 characters");
  }

  // Validate email
  if (!validateEmail(sanitizedEmail)) {
    errors.push("Valid email is required");
  }

  // Validate message
  if (!validateInput(sanitizedMessage, 5000)) {
    errors.push("Message is required and must be less than 5000 characters");
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /(?:onclick|onload|onerror|javascript:)/i,
    /<[^>]*>/,
    /\bbcc:\s*[^;]+;/i,
    /\bcc:\s*[^;]+;/i,
    /content-type:\s*/i,
    /mime-version:\s*/i,
  ];

  const allText = `${sanitizedName} ${sanitizedEmail} ${sanitizedMessage}`;
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(allText)) {
      errors.push("Invalid content detected");
      break;
    }
  }

  return {
    name: sanitizedName,
    email: sanitizedEmail,
    message: sanitizedMessage,
    isValid: errors.length === 0,
    errors,
  };
}
