// Load environment variables FIRST - this must be the very first import
import './env';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { errorHandler } from './middleware/errorHandler';
import { logger } from './config/logger';
import supabaseAuthRoutes from './routes/supabaseAuth';
import gamesRoutes from './routes/games';
import teamsRoutes from './routes/teams';
import { generalRateLimit } from './middleware/rateLimiting';

const app = express();
const PORT = process.env.PORT ?? 3000;
const API_VERSION = process.env.API_VERSION ?? 'v1';

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:8081'],
  credentials: true,
}));
app.use(generalRateLimit);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV ?? 'development',
  });
});

// API Routes
app.use(`/api/${API_VERSION}/auth`, supabaseAuthRoutes);
app.use(`/api/${API_VERSION}/games`, gamesRoutes);
app.use(`/api/${API_VERSION}/teams`, teamsRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
  });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Kigolasso Backend API running on port ${PORT}`);
  logger.info(`📍 Environment: ${process.env.NODE_ENV ?? 'development'}`);
  logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
});

export default app;