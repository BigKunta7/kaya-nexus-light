// Service collaboration : feed, messages, commentaires
import { prisma } from '@/lib/prisma';
import type { UserRole } from '@/types/user';

export async function getCollaborationFeed(userId: string, role: UserRole) {
  // TODO: Récupérer le fil de collaboration (chat, commentaires, éditions)
  return prisma.collaborationMessage.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
}

export async function postCollaborationMessage(userId: string, message: any) {
  // TODO: Enregistrer le message/commentaire en base
  return prisma.collaborationMessage.create({
    data: {
      ...message,
      authorId: userId,
    },
  });
}

export async function getComments(targetId: string, userId: string, role: UserRole) {
  // TODO: Récupérer les commentaires liés à une ressource (doc, tâche, etc.)
  return prisma.collaborationMessage.findMany({
    where: { targetId, type: 'comment' },
    orderBy: { createdAt: 'desc' },
  });
}
