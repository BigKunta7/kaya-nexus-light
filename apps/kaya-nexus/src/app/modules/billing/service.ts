// Service de facturation/abonnements (plans, quotas, Stripe-ready)
import { prisma } from '@/lib/prisma';

export async function createSubscription(userId: string, plan: string, stripeId?: string) {
  return prisma.subscription.create({ data: { userId, plan, stripeId, status: 'active' } });
}

export async function getSubscriptionsForUser(userId: string) {
  return prisma.subscription.findMany({ where: { userId } });
}

export async function updateSubscriptionStatus(subscriptionId: string, status: string) {
  return prisma.subscription.update({ where: { id: subscriptionId }, data: { status } });
}
