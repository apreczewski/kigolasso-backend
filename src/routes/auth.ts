import { Router } from 'express';

export const authRoutes = Router();

// TODO: Implement authentication routes
// These will be implemented in Task #3 (Authentication System)

authRoutes.get('/', (req, res) => {
  res.json({
    message: 'Auth routes - Coming soon',
    endpoints: [
      'POST /register - User registration',
      'POST /login - User login',
      'POST /refresh - Refresh JWT token',
      'POST /logout - User logout',
      'GET /me - Get current user profile',
    ],
  });
});