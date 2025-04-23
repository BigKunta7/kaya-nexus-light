// Service de logs d'audit (actions sensibles, conformité)
import { prisma } from '@/lib/prisma';

export async function logAudit(action: string, userId: string, meta: any = {}) {
  return prisma.auditLog.create({
    data: {
      action,
      userId,
      meta: JSON.stringify(meta),
      createdAt: new Date(),
    },
  });
}

export async function getAuditLogs(limit = 100) {
  return prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}
