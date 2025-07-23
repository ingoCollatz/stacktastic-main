import { vi } from 'vitest';

// Mock environment variables for testing
vi.mock('$env/dynamic/private', () => ({
  env: {
    CAPTCHA_SECRET: 'test-secret',
    CSRF_SECRET: 'test-csrf-secret',
    UPSTASH_REDIS_REST_URL: undefined,
    UPSTASH_REDIS_REST_TOKEN: undefined,
  }
}));

// Global test setup
global.fetch = vi.fn();
