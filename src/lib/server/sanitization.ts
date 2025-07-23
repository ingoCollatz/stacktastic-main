import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Create a DOM window for DOMPurify to use in server-side environment
const window = new JSDOM("").window;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DOMPurifyServer = DOMPurify(window as any);

// Configure DOMPurify for strict sanitization
DOMPurifyServer.setConfig({
  ALLOWED_TAGS: [], // No HTML tags allowed
  ALLOWED_ATTR: [], // No attributes allowed
  KEEP_CONTENT: true, // Keep text content
  ALLOW_DATA_ATTR: false,
  ALLOW_UNKNOWN_PROTOCOLS: false,
  ALLOW_SELF_CLOSE_IN_ATTR: false,
  SANITIZE_DOM: true,
});

export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  // First pass: Remove HTML/script content
  const cleaned = DOMPurifyServer.sanitize(input);

  // Second pass: Additional security measures
  return (
    cleaned
      .trim()
      .slice(0, 10000) // Limit length to prevent DoS
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "") // Remove control characters
      .replace(/\r\n/g, "\n") // Normalize line endings
      .replace(/\n{5,}/g, "\n\n\n\n") // Limit consecutive newlines
      .normalize("NFC")
  ); // Unicode normalization
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
