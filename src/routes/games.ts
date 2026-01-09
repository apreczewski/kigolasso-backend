import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { authenticateSupabaseUser } from '../middleware/supabaseAuth';
import { logger } from '../config/logger';
import { z } from 'zod';

const router = Router();

// Validation schemas
const createGameSchema = z.object({
  homeTeamName: z.string().min(1).max(100),
  awayTeamName: z.string().min(1).max(100),
  scheduledAt: z.string().datetime(),
  fieldName: z.string().max(200).optional(),
  fieldAddress: z.string().max(500).optional(),
  maxPlayers: z.number().int().min(2).max(50).default(22),
  pricePerPlayer: z.number().min(0).optional(),
  duration: z.number().int().min(15).max(180).default(90),
  homeFormation: z.string().default('4-4-2'),
  awayFormation: z.string().default('4-4-2'),
  description: z.string().max(1000).optional(),
  isPrivate: z.boolean().default(false),
});

const updateGameSchema = z.object({
  homeTeamName: z.string().min(1).max(100).optional(),
  awayTeamName: z.string().min(1).max(100).optional(),
  status: z.enum(['SCHEDULED', 'LIVE', 'FINISHED', 'CANCELLED']).optional(),
  homeScore: z.number().int().min(0).optional(),
  awayScore: z.number().int().min(0).optional(),
  scheduledAt: z.string().datetime().optional(),
  startedAt: z.string().datetime().optional(),
  finishedAt: z.string().datetime().optional(),
  homeFormation: z.string().optional(),
  awayFormation: z.string().optional(),
  description: z.string().max(1000).optional(),
});

// =====================================================
// GET /games - List all games
// =====================================================
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, organizerId, limit = '50', offset = '0' } = req.query;

    const games = await prisma.game.findMany({
      where: {
        ...(status && { status: status as 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'CANCELLED' }),
        ...(organizerId && { organizerId: organizerId as string }),
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        game_players: {
          select: {
            id: true,
            team: true,
            confirmedAt: true,
            userId: true,
            users: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            game_players: true,
          },
        },
      },
      orderBy: { scheduledAt: 'desc' },
      take: parseInt(limit as string),
      skip: parseInt(offset as string),
    });

    // Transform to match expected format
    const transformedGames = games.map((game) => ({
      id: game.id,
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      homeScore: game.homeScore,
      awayScore: game.awayScore,
      status: game.status,
      scheduledAt: game.scheduledAt,
      startedAt: game.startedAt,
      finishedAt: game.finishedAt,
      fieldName: game.fieldName,
      fieldAddress: game.fieldAddress,
      maxPlayers: game.maxPlayers,
      pricePerPlayer: game.pricePerPlayer,
      duration: game.duration,
      description: game.description,
      isPrivate: game.isPrivate,
      organizerId: game.organizerId,
      organizerName: game.users?.name,
      organizerAvatar: game.users?.avatarUrl,
      homePlayersCount: game.game_players.filter((p) => p.team === 'home' && p.confirmedAt).length,
      awayPlayersCount: game.game_players.filter((p) => p.team === 'away' && p.confirmedAt).length,
      confirmedPlayersCount: game.game_players.filter((p) => p.confirmedAt).length,
      totalPlayers: game._count.game_players,
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
    }));

    res.json(transformedGames);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Get games error', { error: errorMessage });
    res.status(500).json({ error: 'Failed to get games', details: errorMessage });
  }
});

// =====================================================
// GET /games/my - Get games for current user
// =====================================================
router.get('/my', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Get games where user is organizer
    const organizedGames = await prisma.game.findMany({
      where: { organizerId: userId },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        game_players: true,
        _count: {
          select: { game_players: true },
        },
      },
    });

    // Get games where user is a player
    const playerGames = await prisma.game_players.findMany({
      where: { userId },
      include: {
        games: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
            _count: {
              select: { game_players: true },
            },
          },
        },
      },
    });

    // Combine and deduplicate
    const allGames = new Map();

    organizedGames.forEach((game) => {
      allGames.set(game.id, {
        ...game,
        organizerName: game.users?.name,
        organizerAvatar: game.users?.avatarUrl,
        isOrganizer: true,
        confirmedPlayersCount: game.game_players.filter((p) => p.confirmedAt).length,
        totalPlayers: game._count.game_players,
      });
    });

    playerGames.forEach((pg) => {
      const existing = allGames.get(pg.games.id);
      if (existing) {
        existing.userTeam = pg.team;
        existing.userConfirmedAt = pg.confirmedAt;
      } else {
        allGames.set(pg.games.id, {
          ...pg.games,
          organizerName: pg.games.users?.name,
          organizerAvatar: pg.games.users?.avatarUrl,
          isOrganizer: false,
          userTeam: pg.team,
          userConfirmedAt: pg.confirmedAt,
          totalPlayers: pg.games._count.game_players,
        });
      }
    });

    res.json(Array.from(allGames.values()));
  } catch (error) {
    logger.error('Get my games error', { error });
    res.status(500).json({ error: 'Failed to get games' });
  }
});

// =====================================================
// GET /games/:id - Get game by ID
// =====================================================
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };

    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        game_players: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
        game_events: {
          orderBy: { minute: 'asc' },
        },
      },
    });

    if (!game) {
      res.status(404).json({ error: 'Game not found' });
      return;
    }

    res.json({
      ...game,
      organizerName: game.users?.name,
      organizerAvatar: game.users?.avatarUrl,
      homePlayersCount: game.game_players.filter((p) => p.team === 'home' && p.confirmedAt).length,
      awayPlayersCount: game.game_players.filter((p) => p.team === 'away' && p.confirmedAt).length,
      confirmedPlayersCount: game.game_players.filter((p) => p.confirmedAt).length,
      players: game.game_players.map((p) => ({
        ...p,
        userName: p.users?.name,
        userAvatar: p.users?.avatarUrl,
      })),
      events: game.game_events,
    });
  } catch (error) {
    logger.error('Get game error', { error });
    res.status(500).json({ error: 'Failed to get game' });
  }
});

// =====================================================
// POST /games - Create game
// =====================================================
router.post('/', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    const result = createGameSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation Error',
        details: result.error.issues,
      });
      return;
    }

    const game = await prisma.game.create({
      data: {
        ...result.data,
        scheduledAt: new Date(result.data.scheduledAt),
        organizerId: userId,
        pricePerPlayer: result.data.pricePerPlayer ? result.data.pricePerPlayer : undefined,
      } as any,
      include: {
        users: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    const gameWithUser = game as any;
    logger.info('Game created', { gameId: game.id, organizerId: userId });
    res.status(201).json({
      ...game,
      organizerName: gameWithUser.users?.name,
      organizerAvatar: gameWithUser.users?.avatarUrl,
    });
  } catch (error) {
    logger.error('Create game error', { error });
    res.status(500).json({ error: 'Failed to create game' });
  }
});

// =====================================================
// PATCH /games/:id - Update game
// =====================================================
router.patch('/:id', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const userId = req.user!.id;

    // Check ownership
    const existingGame = await prisma.game.findUnique({
      where: { id },
      select: { organizerId: true },
    });

    if (!existingGame) {
      res.status(404).json({ error: 'Game not found' });
      return;
    }

    if (existingGame.organizerId !== userId) {
      res.status(403).json({ error: 'Not authorized to update this game' });
      return;
    }

    const result = updateGameSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation Error',
        details: result.error.issues,
      });
      return;
    }

    const updateData = {
      ...result.data,
      ...(result.data.scheduledAt && { scheduledAt: new Date(result.data.scheduledAt) }),
      ...(result.data.startedAt && { startedAt: new Date(result.data.startedAt) }),
      ...(result.data.finishedAt && { finishedAt: new Date(result.data.finishedAt) }),
    };

    const game = await prisma.game.update({
      where: { id },
      data: updateData as any,
    });

    res.json(game);
  } catch (error) {
    logger.error('Update game error', { error });
    res.status(500).json({ error: 'Failed to update game' });
  }
});

// =====================================================
// DELETE /games/:id - Delete game
// =====================================================
router.delete('/:id', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const userId = req.user!.id;

    // Check ownership
    const existingGame = await prisma.game.findUnique({
      where: { id },
      select: { organizerId: true },
    });

    if (!existingGame) {
      res.status(404).json({ error: 'Game not found' });
      return;
    }

    if (existingGame.organizerId !== userId) {
      res.status(403).json({ error: 'Not authorized to delete this game' });
      return;
    }

    await prisma.game.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    logger.error('Delete game error', { error });
    res.status(500).json({ error: 'Failed to delete game' });
  }
});

// =====================================================
// POST /games/:id/players/confirm - Confirm attendance
// =====================================================
router.post('/:id/players/confirm', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const userId = req.user!.id;
    const { team } = req.body;

    // Check if player already exists in game
    const existingPlayer = await prisma.game_players.findUnique({
      where: {
        gameId_userId: {
          gameId: id,
          userId,
        },
      },
    });

    if (existingPlayer) {
      // Update existing player
      const player = await prisma.game_players.update({
        where: {
          gameId_userId: {
            gameId: id,
            userId,
          },
        },
        data: {
          confirmedAt: new Date(),
        },
      });

      res.json(player);
      return;
    }

    // Create new player entry
    if (!team || !['home', 'away'].includes(team)) {
      res.status(400).json({ error: 'Valid team (home/away) is required for new players' });
      return;
    }

    const player = await prisma.game_players.create({
      data: {
        gameId: id,
        userId,
        team,
        confirmedAt: new Date(),
      },
    });

    res.status(201).json(player);
  } catch (error) {
    logger.error('Confirm attendance error', { error });
    res.status(500).json({ error: 'Failed to confirm attendance' });
  }
});

// =====================================================
// POST /games/:id/players/deny - Deny attendance
// =====================================================
router.post('/:id/players/deny', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const userId = req.user!.id;

    const player = await prisma.game_players.update({
      where: {
        gameId_userId: {
          gameId: id,
          userId,
        },
      },
      data: {
        confirmedAt: null,
      },
    });

    res.json(player);
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      res.json({ message: 'Not in this game' });
      return;
    }
    logger.error('Deny attendance error', { error });
    res.status(500).json({ error: 'Failed to deny attendance' });
  }
});

export default router;
