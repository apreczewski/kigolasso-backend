import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { authenticateSupabaseUser } from '../middleware/supabaseAuth';
import { logger } from '../config/logger';
import { z } from 'zod';

const router = Router();

// Validation schemas
const createTeamSchema = z.object({
  name: z.string().min(1).max(100),
  logo: z.string().url().optional().nullable(),
  description: z.string().max(500).optional().nullable(),
});

const updateTeamSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  logo: z.string().url().optional().nullable(),
  description: z.string().max(500).optional().nullable(),
});

const addMemberSchema = z.object({
  userId: z.string().min(1),
  number: z.number().int().min(1).max(99).optional(),
  position: z.enum(['GOLEIRO', 'ZAGUEIRO', 'LATERAL', 'MEIA', 'ATACANTE']).optional(),
  isCaptain: z.boolean().default(false),
});

// =====================================================
// GET /teams - List all teams for current user
// =====================================================
router.get('/', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Get teams where user is owner
    const ownedTeams = await prisma.team.findMany({
      where: { ownerId: userId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
        _count: {
          select: { members: true },
        },
      },
    });

    // Get teams where user is a member
    const memberTeams = await prisma.teamMember.findMany({
      where: { userId, status: 'active' },
      include: {
        team: {
          include: {
            members: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    avatarUrl: true,
                  },
                },
              },
            },
            users: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
            _count: {
              select: { members: true },
            },
          },
        },
      },
    });

    // Combine and transform
    const teams = new Map();

    // Add owned teams
    ownedTeams.forEach((team) => {
      teams.set(team.id, {
        id: team.id,
        name: team.name,
        logo: team.logo,
        description: team.description,
        membersCount: team._count.members,
        isOwner: true,
        isMyTeam: true,
        isCaptain: true,
        achievements: {
          stars: [],
          recentTrophies: [],
        },
        stats: {
          totalGamesPlayed: team.totalGamesPlayed,
          gamesWon: team.gamesWon,
          gamesDrawn: team.gamesDrawn,
          gamesLost: team.gamesLost,
          goalsFor: team.goalsFor,
          goalsAgainst: team.goalsAgainst,
        },
        members: team.members.map((m) => ({
          id: m.id,
          userId: m.userId,
          name: m.user.name,
          avatarUrl: m.user.avatarUrl,
          number: m.number,
          position: m.position,
          isCaptain: m.isCaptain,
          status: m.status,
        })),
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
      });
    });

    // Add member teams (if not already owner)
    memberTeams.forEach((membership) => {
      const team = membership.team;
      if (!teams.has(team.id)) {
        teams.set(team.id, {
          id: team.id,
          name: team.name,
          logo: team.logo,
          description: team.description,
          membersCount: team._count.members,
          isOwner: false,
          isMyTeam: true,
          isCaptain: membership.isCaptain,
          playerPosition: {
            number: membership.number,
            position: membership.position,
          },
          achievements: {
            stars: [],
            recentTrophies: [],
          },
          stats: {
            totalGamesPlayed: team.totalGamesPlayed,
            gamesWon: team.gamesWon,
            gamesDrawn: team.gamesDrawn,
            gamesLost: team.gamesLost,
            goalsFor: team.goalsFor,
            goalsAgainst: team.goalsAgainst,
          },
          ownerName: team.users.name,
          ownerAvatar: team.users.avatarUrl,
          members: team.members.map((m) => ({
            id: m.id,
            userId: m.userId,
            name: m.user.name,
            avatarUrl: m.user.avatarUrl,
            number: m.number,
            position: m.position,
            isCaptain: m.isCaptain,
            status: m.status,
          })),
          createdAt: team.createdAt,
          updatedAt: team.updatedAt,
        });
      }
    });

    res.json(Array.from(teams.values()));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Get teams error', { error: errorMessage });
    res.status(500).json({ error: 'Failed to get teams', details: errorMessage });
  }
});

// =====================================================
// GET /teams/:id - Get team by ID
// =====================================================
router.get('/:id', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
        _count: {
          select: { members: true },
        },
      },
    });

    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }

    const isOwner = team.ownerId === userId;
    const membership = team.members.find((m) => m.userId === userId);

    res.json({
      id: team.id,
      name: team.name,
      logo: team.logo,
      description: team.description,
      membersCount: team._count.members,
      isOwner,
      isMyTeam: isOwner || !!membership,
      isCaptain: isOwner || membership?.isCaptain || false,
      playerPosition: membership
        ? {
          number: membership.number,
          position: membership.position,
        }
        : null,
      achievements: {
        stars: [],
        recentTrophies: [],
      },
      stats: {
        totalGamesPlayed: team.totalGamesPlayed,
        gamesWon: team.gamesWon,
        gamesDrawn: team.gamesDrawn,
        gamesLost: team.gamesLost,
        goalsFor: team.goalsFor,
        goalsAgainst: team.goalsAgainst,
      },
      ownerName: team.users.name,
      ownerAvatar: team.users.avatarUrl,
      members: team.members.map((m) => ({
        id: m.id,
        userId: m.userId,
        name: m.user.name,
        avatarUrl: m.user.avatarUrl,
        number: m.number,
        position: m.position,
        isCaptain: m.isCaptain,
        status: m.status,
      })),
      createdAt: team.createdAt,
      updatedAt: team.updatedAt,
    });
  } catch (error) {
    logger.error('Get team error', { error });
    res.status(500).json({ error: 'Failed to get team' });
  }
});

// =====================================================
// POST /teams - Create team
// =====================================================
router.post('/', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    const result = createTeamSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation Error',
        details: result.error.issues,
      });
      return;
    }

    // Create team and add owner as captain member in transaction
    const team = await prisma.$transaction(async (tx) => {
      const newTeam = await tx.team.create({
        data: {
          name: result.data.name,
          logo: result.data.logo,
          description: result.data.description,
          ownerId: userId,
        },
      });

      // Add owner as first member (captain)
      await tx.teamMember.create({
        data: {
          teamId: newTeam.id,
          userId: userId,
          isCaptain: true,
          status: 'active',
          updatedAt: new Date(),
        },
      });

      return newTeam;
    });

    logger.info('Team created', { teamId: team.id, ownerId: userId });

    res.status(201).json({
      id: team.id,
      name: team.name,
      logo: team.logo,
      description: team.description,
      membersCount: 1,
      isOwner: true,
      isMyTeam: true,
      isCaptain: true,
      achievements: {
        stars: [],
        recentTrophies: [],
      },
      stats: {
        totalGamesPlayed: 0,
        gamesWon: 0,
        gamesDrawn: 0,
        gamesLost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
      },
      createdAt: team.createdAt,
      updatedAt: team.updatedAt,
    });
  } catch (error) {
    logger.error('Create team error', { error });
    res.status(500).json({ error: 'Failed to create team' });
  }
});

// =====================================================
// PATCH /teams/:id - Update team
// =====================================================
router.patch('/:id', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    // Check ownership
    const existingTeam = await prisma.team.findUnique({
      where: { id },
      select: { ownerId: true },
    });

    if (!existingTeam) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }

    if (existingTeam.ownerId !== userId) {
      res.status(403).json({ error: 'Not authorized to update this team' });
      return;
    }

    const result = updateTeamSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation Error',
        details: result.error.issues,
      });
      return;
    }

    const team = await prisma.team.update({
      where: { id },
      data: result.data,
    });

    res.json(team);
  } catch (error) {
    logger.error('Update team error', { error });
    res.status(500).json({ error: 'Failed to update team' });
  }
});

// =====================================================
// DELETE /teams/:id - Delete team
// =====================================================
router.delete('/:id', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const userId = req.user!.id;

    // Check ownership
    const existingTeam = await prisma.team.findUnique({
      where: { id },
      select: { ownerId: true },
    });

    if (!existingTeam) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }

    if (existingTeam.ownerId !== userId) {
      res.status(403).json({ error: 'Not authorized to delete this team' });
      return;
    }

    await prisma.team.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    logger.error('Delete team error', { error });
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

// =====================================================
// POST /teams/:id/members - Add member to team
// =====================================================
router.post('/:id/members', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const userId = req.user!.id;

    // Check if user is owner or captain
    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        members: {
          where: { userId, isCaptain: true },
        },
      },
    });

    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }

    const isOwner = team.ownerId === userId;
    const isCaptain = team.members.length > 0;

    if (!isOwner && !isCaptain) {
      res.status(403).json({ error: 'Not authorized to add members' });
      return;
    }

    const result = addMemberSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation Error',
        details: result.error.issues,
      });
      return;
    }

    // Check if user already in team
    const existingMember = await prisma.teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId: id,
          userId: result.data.userId,
        },
      },
    });

    if (existingMember) {
      res.status(409).json({ error: 'User is already a member of this team' });
      return;
    }

    const member = await prisma.teamMember.create({
      data: {
        teamId: id,
        userId: result.data.userId,
        number: result.data.number,
        position: result.data.position,
        isCaptain: result.data.isCaptain,
        status: 'active',
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    const memberWithUser = member as any;

    res.status(201).json({
      id: member.id,
      userId: member.userId,
      name: memberWithUser.user.name,
      avatarUrl: memberWithUser.user.avatarUrl,
      number: member.number,
      position: member.position,
      isCaptain: member.isCaptain,
      status: member.status,
    });
  } catch (error) {
    logger.error('Add member error', { error });
    res.status(500).json({ error: 'Failed to add member' });
  }
});

// =====================================================
// DELETE /teams/:id/members/:memberId - Remove member
// =====================================================
router.delete('/:id/members/:memberId', authenticateSupabaseUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, memberId } = req.params;
    const userId = req.user!.id;

    // Check if user is owner
    const team = await prisma.team.findUnique({
      where: { id },
      select: { ownerId: true },
    });

    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }

    // Get the member to be removed
    const memberToRemove = await prisma.teamMember.findUnique({
      where: { id: memberId },
    });

    if (!memberToRemove || memberToRemove.teamId !== id) {
      res.status(404).json({ error: 'Member not found' });
      return;
    }

    // Can't remove the owner
    if (memberToRemove.userId === team.ownerId) {
      res.status(403).json({ error: 'Cannot remove the team owner' });
      return;
    }

    // Only owner can remove other members, or member can leave themselves
    if (team.ownerId !== userId && memberToRemove.userId !== userId) {
      res.status(403).json({ error: 'Not authorized to remove this member' });
      return;
    }

    await prisma.teamMember.delete({
      where: { id: memberId },
    });

    res.status(204).send();
  } catch (error) {
    logger.error('Remove member error', { error });
    res.status(500).json({ error: 'Failed to remove member' });
  }
});

export default router;
