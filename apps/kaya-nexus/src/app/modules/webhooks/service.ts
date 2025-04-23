// Service de gestion des webhooks (événements, callbacks externes)
import { prisma } from '@/lib/prisma';

export async function registerWebhook(userId: string, url: string, event: string) {
  return prisma.webhook.create({ data: { userId, url, event } });
}

export async function getWebhooksForUser(userId: string) {
  return prisma.webhook.findMany({ where: { userId } });
}

export async function triggerWebhook(event: string, payload: any) {
  // À compléter : retrouver tous les webhooks pour l'événement et envoyer le payload (fetch/post)
}
