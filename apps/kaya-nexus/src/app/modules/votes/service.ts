// Service de votes/sondages (prise de décision, feedback rapide)
import { prisma } from '@/lib/prisma';

export async function createPoll(question: string, options: string[], creatorId: string) {
  return prisma.poll.create({
    data: {
      question,
      creatorId,
      options: { create: options.map(option => ({ text: option })) },
    },
    include: { options: true },
  });
}

export async function vote(pollOptionId: string, userId: string) {
  return prisma.vote.create({ data: { pollOptionId, userId } });
}

export async function getPollResults(pollId: string) {
  return prisma.poll.findUnique({
    where: { id: pollId },
    include: { options: { include: { votes: true } } },
  });
}
