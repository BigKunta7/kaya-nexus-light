import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { getAnalyticsData, getKpis } from '@/modules/analytics/service';
import { z } from 'zod';

/**
 * @swagger
 * /api/v1/analytics:
 *   get:
 *     summary: Statistiques globales
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: Statistiques globales
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur analytics
 */
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
    // Gestion des rôles : admin/manager = tout, viewer = restreint
    const data = await getAnalyticsData(user.id, user.role);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('[ANALYTICS]', error);
    return NextResponse.json({ message: 'Erreur serveur analytics' }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/v1/analytics/kpis:
 *   get:
 *     summary: KPIs détaillés
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: KPIs détaillés
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur analytics/kpis
 */
export async function GET_KPIS(req: NextRequest) {
  try {
    const token = req.cookies.get('kaya-token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Non authentifié' }, { status: 401 });
    }
    const user = verifyJwt(token);
    if (!user) {
      return NextResponse.json({ message: 'Token invalide' }, { status: 401 });
    }
    const kpis = await getKpis(user.id, user.role);
    return NextResponse.json({ kpis });
  } catch (error) {
    console.error('[ANALYTICS-KPIS]', error);
    return NextResponse.json({ message: 'Erreur serveur analytics/kpis' }, { status: 500 });
  }
}
