// Service de chat interne (messages directs, salons)
import { prisma } from "../../lib/prisma";

export async function getChatsForUser(userId: string) {
  return prisma.chat.findMany({
    where: { participants: { some: { id: userId } } },
    include: { messages: { orderBy: { createdAt: 'desc' }, take: 50 } },
  });
}

export async function sendMessage(chatId: string, userId: string, content: string) {
  return prisma.message.create({
    data: { chatId, authorId: userId, content },
  });
}
