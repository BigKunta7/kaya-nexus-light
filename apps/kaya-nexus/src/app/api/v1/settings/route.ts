import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/v1/settings:
 *   get:
 *     summary: Récupère les paramètres de l'application
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Paramètres de l'application
 */
export async function GET() {
  return NextResponse.json({});
}
