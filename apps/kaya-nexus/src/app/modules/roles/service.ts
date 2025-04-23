// Service de gestion des rôles et permissions (RBAC)
import { prisma } from '@/lib/prisma';

export async function getRoles() {
  return prisma.role.findMany();
}

export async function assignRoleToUser(userId: string, roleId: string) {
  return prisma.user.update({ where: { id: userId }, data: { roleId } });
}

export async function getUserPermissions(userId: string) {
  // Retourne les permissions effectives d'un utilisateur
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { role: true } });
  return user?.role?.permissions || [];
}
