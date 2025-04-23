// Service de dashboards custom (multi-vues, widgets, filtres)
import { prisma } from '@/lib/prisma';

export async function getUserDashboard(userId: string) {
  // Récupère la configuration du dashboard utilisateur (widgets, préférences)
  return prisma.dashboard.findUnique({ where: { userId } });
}

export async function updateUserDashboard(userId: string, config: any) {
  return prisma.dashboard.upsert({
    where: { userId },
    update: { config },
    create: { userId, config },
  });
}
