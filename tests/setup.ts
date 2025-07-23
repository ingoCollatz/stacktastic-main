import { vi } from "vitest";

// Mock environment variables for testing
vi.mock("$env/dynamic/private", () => ({
  env: {
    CAPTCHA_SECRET: "test-secret",
    CSRF_SECRET: "test-csrf-secret",
    // Rate limiting now uses in-memory storage, no external dependencies
  },
}));

// Global test setup
global.fetch = vi.fn();
