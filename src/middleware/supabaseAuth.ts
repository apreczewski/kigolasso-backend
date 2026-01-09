import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { prisma } from '../config/prisma';
import { logger } from '../config/logger';

// Extend Express Request to include user
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace, no-unused-vars
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, no-unused-vars
    interface Request {
      user?: {
        id: string;
        email: string;
        name?: string;
        phone?: string;
        avatar_url?: string;
      };
    }
  }
}

/**
 * Middleware to authenticate requests using Supabase JWT
 * Expects Authorization header with Bearer token
 */
export const authenticateSupabaseUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header'
      });
      return;
    }

    const token = authHeader.split(' ')[1] || '';

    // Development only: Allow local tokens from AuthContextFixed
    if (token.startsWith('local-token-')) {
      const userId = token.replace('local-token-', '');
      logger.info(`🔓 Dev Auth: Using local token for user ${userId}`);

      try {
        // Upsert user in Prisma to ensure they exist and avoid FK errors
        // This allows multiple distinct users in local dev
        const user = await prisma.user.upsert({
          where: { id: userId },
          update: {}, // No updates if exists
          create: {
            id: userId,
            email: `dev-${userId}@local.com`,
            password: 'dev-password',
            name: 'Local Dev User',
            role: 'PLAYER',
            onboardingCompleted: true,
          }
        });

        req.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone || undefined,
          avatar_url: user.avatarUrl || undefined
        };

        next();
        return;
      } catch (err) {
        logger.error('Failed to upsert dev user', { error: err });
        res.status(500).json({ error: 'Internal Server Error', message: 'Failed to authenticate dev user' });
        return;
      }
    }

    // Verify the JWT token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      logger.warn('Authentication failed', { error: error?.message });
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or expired token'
      });
      return;
    }

    // Fetch user profile from database
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      logger.error('Failed to fetch user profile', {
        userId: user.id,
        error: profileError.message
      });
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch user profile'
      });
      return;
    }

    // Attach user to request object
    req.user = {
      id: user.id,
      email: user.email || (profile as any)?.email || '',
      name: (profile as any)?.name || undefined,
      phone: (profile as any)?.phone || undefined,
      avatar_url: (profile as any)?.avatar_url || undefined,
    };

    logger.info('User authenticated successfully', {
      userId: user.id,
      email: user.email
    });

    next();
  } catch (error) {
    logger.error('Authentication middleware error', { error });
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Authentication failed'
    });
  }
};

/**
 * Optional authentication middleware - doesn't fail if no token provided
 * Useful for endpoints that work for both authenticated and anonymous users
 */
export const optionalSupabaseAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token provided, continue without user
      next();
      return;
    }

    const token = authHeader.split(' ')[1] || '';

    // Development only: Allow local tokens from AuthContextFixed in optional auth
    if (token.startsWith('local-token-')) {
      const userId = token.replace('local-token-', '');

      try {
        const user = await prisma.user.upsert({
          where: { id: userId },
          update: {},
          create: {
            id: userId,
            email: `dev-${userId}@local.com`,
            password: 'dev-password',
            name: 'Local Dev User',
            role: 'PLAYER',
            onboardingCompleted: true,
          }
        });

        req.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone || undefined,
          avatar_url: user.avatarUrl || undefined
        };
      } catch (err) {
        logger.error('Optional auth: Failed to upsert dev user', { error: err });
        // Don't fail, just continue without user
      }

      next();
      return;
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (!error && user) {
      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        req.user = {
          id: user.id,
          email: user.email || (profile as any)?.email || '',
          name: (profile as any)?.name || undefined,
          phone: (profile as any)?.phone || undefined,
          avatar_url: (profile as any)?.avatar_url || undefined,
        };
      }
    }

    next();
  } catch (error) {
    logger.error('Optional auth middleware error', { error });
    // Don't fail the request, just continue without user
    next();
  }
};