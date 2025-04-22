import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/v1/ia:
 *   get:
 *     summary: Liste des tâches IA
 *     tags:
 *       - IA
 *     responses:
 *       200:
 *         description: Liste des tâches IA
 */
export async function GET() {
  return NextResponse.json([]);
}
