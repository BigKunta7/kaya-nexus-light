// Service de gestion des quotas et limites (stockage, utilisateurs, API calls)
import { prisma } from '@/lib/prisma';

export async function setQuota(orgId: string, type: string, value: number) {
  return prisma.quota.upsert({
    where: { orgId_type: { orgId, type } },
    update: { value },
    create: { orgId, type, value },
  });
}

export async function getQuota(orgId: string, type: string) {
  return prisma.quota.findUnique({ where: { orgId_type: { orgId, type } } });
}

export async function incrementUsage(orgId: string, type: string, amount: number) {
  // À compléter : incrémentation atomique de l’usage
}
