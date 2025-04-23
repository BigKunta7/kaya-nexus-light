// Service de sandbox/démo (environnements isolés pour test)
import { prisma } from '@/lib/prisma';

export async function createSandbox(userId: string, config: any) {
  return prisma.sandbox.create({ data: { userId, config, status: 'active' } });
}

export async function getSandboxesForUser(userId: string) {
  return prisma.sandbox.findMany({ where: { userId } });
}

export async function archiveSandbox(sandboxId: string) {
  return prisma.sandbox.update({ where: { id: sandboxId }, data: { status: 'archived' } });
}
