// Service d’API publique (gestion des clés, throttling, quotas)
import { prisma } from '@/lib/prisma';

export async function createApiKey(userId: string, name: string) {
  return prisma.apiKey.create({ data: { userId, name, key: crypto.randomUUID() } });
}

export async function getApiKeysForUser(userId: string) {
  return prisma.apiKey.findMany({ where: { userId } });
}

export async function revokeApiKey(keyId: string) {
  return prisma.apiKey.update({ where: { id: keyId }, data: { revoked: true } });
}
