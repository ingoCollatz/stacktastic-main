import { vi } from "vitest";

// Mock environment variables for testing
vi.mock("$env/dynamic/private", () => ({
  env: {
    CAPTCHA_SECRET: "test-secret",
    CSRF_SECRET: "test-csrf-secret",
    REDIS_URL: undefined, // Tests run without Redis
  },
}));

// Global test setup
global.fetch = vi.fn();
