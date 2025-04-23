// Service de gestion de fichiers/documents (upload, partage, versionning)
import { prisma } from '@/lib/prisma';

export async function uploadFile(userId: string, fileMeta: any) {
  // fileMeta = { name, size, type, ... }
  return prisma.file.create({
    data: { ...fileMeta, uploaderId: userId },
  });
}

export async function getFilesForUser(userId: string) {
  return prisma.file.findMany({ where: { uploaderId: userId } });
}

export async function shareFile(fileId: string, targetUserId: string) {
  return prisma.fileShare.create({ data: { fileId, targetUserId } });
}
