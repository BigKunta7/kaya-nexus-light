// Service de sécurité avancée (rate limiting, 2FA, gestion tokens)
// NB : à compléter avec une implémentation Redis ou autre pour le rate limiting réel
import { prisma } from '@/lib/prisma';

export async function logFailedLogin(userId: string) {
  return prisma.securityEvent.create({
    data: { userId, type: 'failed_login', createdAt: new Date() },
  });
}

export async function enable2FA(userId: string, secret: string) {
  return prisma.user.update({ where: { id: userId }, data: { twoFASecret: secret, twoFAEnabled: true } });
}

export async function disable2FA(userId: string) {
  return prisma.user.update({ where: { id: userId }, data: { twoFASecret: null, twoFAEnabled: false } });
}

export async function is2FAEnabled(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user?.twoFAEnabled || false;
}
