// Service multi-tenant (organisations, filiales, workspaces)
import { prisma } from '@/lib/prisma';

export async function createOrganization(name: string, ownerId: string) {
  return prisma.organization.create({ data: { name, ownerId } });
}

export async function getOrganizationsForUser(userId: string) {
  return prisma.organization.findMany({ where: { members: { some: { id: userId } } } });
}

export async function inviteUserToOrganization(orgId: string, userId: string, role: string) {
  return prisma.organizationMember.create({ data: { orgId, userId, role } });
}
