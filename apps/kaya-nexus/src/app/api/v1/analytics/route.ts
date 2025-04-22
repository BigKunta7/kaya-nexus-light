import { NextRequest, NextResponse } from 'next/server';

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
 */
export async function GET() {
  return NextResponse.json([]);
}
