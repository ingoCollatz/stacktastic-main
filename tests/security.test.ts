/**
 * Security Tests for Contact Form
 * Run with: npm test
 */

import { describe, it, expect } from 'vitest';
import { validateContactForm, sanitizeInput, sanitizeEmail, validateEmail } from '../src/lib/server/sanitization';

describe('Input Sanitization', () => {
  it('should remove HTML/script tags', () => {
    const maliciousInput = '<script>alert("xss")</script>Hello';
    const sanitized = sanitizeInput(maliciousInput);
    expect(sanitized).toBe('Hello');
    expect(sanitized).not.toContain('<script>');
  });

  it('should remove control characters', () => {
    const inputWithControls = 'Hello\x00\x08World\x1F';
    const sanitized = sanitizeInput(inputWithControls);
    expect(sanitized).toBe('HelloWorld');
  });

  it('should limit input length', () => {
    const longInput = 'a'.repeat(15000);
    const sanitized = sanitizeInput(longInput);
    expect(sanitized.length).toBeLessThanOrEqual(10000);
  });

  it('should normalize unicode', () => {
    const unicodeInput = 'café'; // é as combining character
    const sanitized = sanitizeInput(unicodeInput);
    expect(sanitized).toBe('café'); // é as single character
  });
});

describe('Email Validation', () => {
  it('should sanitize email addresses', () => {
    const maliciousEmail = 'user@domain.com<script>alert(1)</script>';
    const sanitized = sanitizeEmail(maliciousEmail);
    expect(sanitized).toBe('user@domain.comscriptalert1script');
  });

  it('should validate proper email format', () => {
    const validEmail = 'user@example.com';
    const invalidEmail = 'not-an-email';

    expect(validateEmail(validEmail)).toBe(true);
    expect(validateEmail(invalidEmail)).toBe(false);
  });
});

describe('Contact Form Validation', () => {
  it('should validate and sanitize all fields', () => {
    const result = validateContactForm(
      'John <script>alert("xss")</script>',
      'john@example.com',
      'Hello world!'
    );

    expect(result.isValid).toBe(true);
    expect(result.name).toBe('John'); // DOMPurify removes script tags completely
    expect(result.email).toBe('john@example.com');
    expect(result.message).toBe('Hello world!');
  });

  it('should reject empty fields', () => {
    const result = validateContactForm('', '', '');
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('should detect suspicious patterns', () => {
    const result = validateContactForm(
      'Test User',
      'test@example.com',
      'bcc: evil@hacker.com; malicious content'
    );

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Invalid content detected');
  });

  it('should reject overly long inputs', () => {
    const longName = 'a'.repeat(200);
    const result = validateContactForm(
      longName,
      'test@example.com',
      'Hello'
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.some(error => error.includes('less than 100 characters'))).toBe(true);
  });
});
