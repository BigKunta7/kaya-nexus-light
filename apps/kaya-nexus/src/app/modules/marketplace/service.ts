// Service de marketplace/extensions (modules additionnels, plugins)
import { prisma } from '@/lib/prisma';

export async function listExtensions() {
  return prisma.extension.findMany({ where: { published: true } });
}

export async function installExtension(userId: string, extensionId: string) {
  return prisma.userExtension.create({ data: { userId, extensionId } });
}

export async function uninstallExtension(userId: string, extensionId: string) {
  return prisma.userExtension.deleteMany({ where: { userId, extensionId } });
}
