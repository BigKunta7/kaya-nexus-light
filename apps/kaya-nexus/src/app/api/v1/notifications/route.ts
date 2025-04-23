import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { getUserNotifications } from '@/modules/notifications/service';
import { z } from 'zod';

/**
 * @swagger
 * /api/v1/notifications:
 *   get:
 *     summary: Liste des notifications
 *     tags:
 *       - Notifications
 *     responses:
 *       200:
 *         description: Liste des notifications
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur notifications
 */
// GET : Liste des notifications utilisateur (sécurisé, paginé)
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('kaya-token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Non authentifié' }, { status: 401 });
    }
    const user = verifyJwt(token);
    if (!user) {
      return NextResponse.json({ message: 'Token invalide' }, { status: 401 });
    }
    // Pagination et filtrage (exemple)
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);
    const notifications = await getUserNotifications(user.id, page, pageSize);
    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('[NOTIFICATIONS]', error);
    return NextResponse.json({ message: 'Erreur serveur notifications' }, { status: 500 });
  }
}
