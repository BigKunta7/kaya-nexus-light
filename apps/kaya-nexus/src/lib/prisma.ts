// Prisma client singleton pour Next.js (évite les multiples instances en dev)
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Tous les accès DB doivent passer par ce client centralisé
