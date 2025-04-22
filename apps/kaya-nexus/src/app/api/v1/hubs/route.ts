import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/v1/hubs:
 *   get:
 *     summary: Liste tous les hubs
 *     tags:
 *       - Hubs
 *     responses:
 *       200:
 *         description: Liste des hubs
 */
export async function GET() {
  return NextResponse.json([]);
}
