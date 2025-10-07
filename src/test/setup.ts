// Jest setup file for tests
import { logger } from '@/config/logger';

// Disable logging during tests
logger.transports.forEach(transport => {
  transport.silent = true;
});

// Global test setup
beforeAll(async () => {
  // Add any global setup here
});

afterAll(async () => {
  // Add any global cleanup here
});

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/kigolasso_test';