import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { authenticateSupabaseUser } from '../middleware/supabaseAuth';
import { logger } from '../config/logger';
import { z } from 'zod';

const router = Router();

// Validation schemas
const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  phone: z.string().regex(/^\+?[\d\s-()]+$/).optional(),
  avatar_url: z.string().url().optional(),
});

/**
 * GET /auth/profile
 * Get current user profile
 */
router.get('/profile', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      logger.error('Failed to fetch profile', { userId, error: error.message });
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch profile',
      });
      return;
    }

    res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    logger.error('Profile fetch error', { error });
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
    });
  }
});

/**
 * PUT /auth/profile
 * Update current user profile
 */
router.put('/profile', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    
    // Validate request body
    const result = updateProfileSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Invalid profile data',
        details: result.error.issues,
      });
      return;
    }

    const updateData = {
      ...result.data,
      updated_at: new Date().toISOString(),
    };

    const { data: profile, error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      logger.error('Failed to update profile', { userId, error: error.message });
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to update profile',
      });
      return;
    }

    logger.info('Profile updated successfully', { userId });

    res.json({
      success: true,
      data: profile,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    logger.error('Profile update error', { error });
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
    });
  }
});

/**
 * DELETE /auth/profile
 * Delete current user account
 */
router.delete('/profile', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Delete user profile from database
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (profileError) {
      logger.error('Failed to delete profile', { userId, error: profileError.message });
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to delete profile',
      });
      return;
    }

    // Delete user from Supabase Auth (requires service role)
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);

    if (authError) {
      logger.error('Failed to delete auth user', { userId, error: authError.message });
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to delete user account',
      });
      return;
    }

    logger.info('User account deleted successfully', { userId });

    res.json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    logger.error('Account deletion error', { error });
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
    });
  }
});

/**
 * GET /auth/me
 * Get current user info (lightweight endpoint)
 */
router.get('/me', authenticateSupabaseUser, (req: Request, res: Response) => {
  res.json({
    success: true,
    data: req.user,
  });
});

/**
 * POST /auth/refresh
 * Refresh user session (handled by Supabase client-side, this is just for consistency)
 */
router.post('/refresh', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Token refresh should be handled client-side with Supabase',
  });
});

export default router;