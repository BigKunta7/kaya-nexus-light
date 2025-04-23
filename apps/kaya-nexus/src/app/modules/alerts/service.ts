// Service d'alertes KPIs et monitoring
import { prisma } from '@/lib/prisma';

export async function createAlert(userId: string, type: string, threshold: number, target: string) {
  return prisma.alert.create({
    data: { userId, type, threshold, target },
  });
}

export async function getAlertsForUser(userId: string) {
  return prisma.alert.findMany({ where: { userId } });
}

export async function triggerAlert(alertId: string, value: number) {
  // À compléter : logique de déclenchement (notification, email, etc.)
  return prisma.alert.update({ where: { id: alertId }, data: { lastTriggeredAt: new Date(), lastValue: value } });
}
