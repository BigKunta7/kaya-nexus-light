// Service analytics : récupération des statistiques et KPIs
import { prisma } from '@/lib/prisma';
import type { UserRole } from '@/types/user';

export async function getAnalyticsData(userId: string, role: UserRole) {
  return {
    users: await prisma.user.count(),
    projects: await prisma.project.count(),
    messages: await prisma.message.count(),
  };
}

export async function getKpis(userId: string, role: UserRole) {
  const activeUsers = await prisma.user.count({ where: { isActive: true } });
  const activeProjects = await prisma.project.count({ where: { status: 'active' } });
  return [
    { label: 'Utilisateurs actifs', value: activeUsers },
    { label: 'Projets actifs', value: activeProjects },
  ];
}
