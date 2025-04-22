import { NextRequest, NextResponse } from 'next/server';

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
 */
export async function GET() {
  return NextResponse.json([]);
}
