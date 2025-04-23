// Service notifications : récupération notifications utilisateur

import { prisma } from '@/lib/prisma';

export async function getUserNotifications(userId: string, page = 1, pageSize = 20) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
}
