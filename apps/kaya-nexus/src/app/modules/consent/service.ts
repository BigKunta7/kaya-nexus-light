// Service de gestion des consentements utilisateurs (RGPD)
import { prisma } from '@/lib/prisma';

export async function giveConsent(userId: string, consentType: string) {
  return prisma.consent.upsert({
    where: { userId_consentType: { userId, consentType } },
    update: { given: true, updatedAt: new Date() },
    create: { userId, consentType, given: true, updatedAt: new Date() },
  });
}

export async function revokeConsent(userId: string, consentType: string) {
  return prisma.consent.update({
    where: { userId_consentType: { userId, consentType } },
    data: { given: false, updatedAt: new Date() },
  });
}

export async function getUserConsents(userId: string) {
  return prisma.consent.findMany({ where: { userId } });
}
