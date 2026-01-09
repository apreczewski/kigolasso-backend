import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // 1. Create Test User
    const devUser = await prisma.user.upsert({
        where: { email: 'dev@kigolasso.com' },
        update: {},
        create: {
            id: "dev-user-ID-123", // Matches the hardcoded ID in middleware
            email: 'dev@kigolasso.com',
            password: 'password123', // Not really used for local token dev
            name: 'Local Developer',
            role: 'PLAYER',
            createdAt: new Date(),
        },
    });

    console.log('👤 Dev User created/found:', devUser.id);

    // 2. Create Sample Teams
    const teamsData = [
        {
            name: 'Corinthians do Bairro',
            description: 'Time fundado em 2024 para jogar aos sábados.',
            ownerId: devUser.id,
            totalGamesPlayed: 10,
            gamesWon: 5,
        },
        {
            name: 'Real Matismo',
            description: 'Focado em campeonatos de várzea.',
            ownerId: devUser.id,
            totalGamesPlayed: 5,
            gamesWon: 1,
        },
        {
            name: 'Inter de Meião',
            description: 'Só resenha e churrasco.',
            ownerId: devUser.id,
            totalGamesPlayed: 50,
            gamesWon: 25,
        }
    ];

    for (const teamData of teamsData) {
        const team = await prisma.team.create({
            data: teamData
        });
        console.log(`⚽ Created team: ${team.name}`);

        // Add owner as a member
        await prisma.teamMember.create({
            data: {
                teamId: team.id,
                userId: devUser.id,
                status: 'active',
                isCaptain: true,
                updatedAt: new Date()
            }
        });
    }

    console.log('✅ Seed completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
