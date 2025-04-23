// Service de commentaires imbriqués (threads, réponses)
import { prisma } from "../../lib/prisma";

export async function getCommentsForTarget(targetId: string) {
  return prisma.comment.findMany({
    where: { targetId },
    include: { replies: true },
    orderBy: { createdAt: 'asc' },
  });
}

export async function postComment(targetId: string, authorId: string, content: string, parentId?: string) {
  return prisma.comment.create({
    data: { targetId, authorId, content, parentId },
  });
}
