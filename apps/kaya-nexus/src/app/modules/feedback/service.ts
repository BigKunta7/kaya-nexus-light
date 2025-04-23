// Service de feedback utilisateur (remontée, NPS, suggestions)
import { prisma } from '@/lib/prisma';

export async function submitFeedback(userId: string, type: string, message: string, rating?: number) {
  return prisma.feedback.create({ data: { userId, type, message, rating } });
}

export async function getFeedbacks(limit = 100) {
  return prisma.feedback.findMany({ orderBy: { createdAt: 'desc' }, take: limit });
}
