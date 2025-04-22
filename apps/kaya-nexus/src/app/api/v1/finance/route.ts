import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/v1/finance:
 *   get:
 *     summary: Liste toutes les opérations financières
 *     tags:
 *       - Finance
 *     responses:
 *       200:
 *         description: Liste des opérations
 */
export async function GET() {
  return NextResponse.json([]);
}
