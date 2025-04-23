// Service de recherche intelligente (full-text, filtres avancés)
import { prisma } from '@/lib/prisma';

export async function searchProjects(userId: string, query: string) {
  // Recherche full-text sur les projets de l'utilisateur
  return prisma.project.findMany({
    where: {
      ownerId: userId,
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function searchMessages(userId: string, query: string) {
  return prisma.message.findMany({
    where: {
      authorId: userId,
      content: { contains: query, mode: 'insensitive' },
    },
    orderBy: { createdAt: 'desc' },
  });
}
