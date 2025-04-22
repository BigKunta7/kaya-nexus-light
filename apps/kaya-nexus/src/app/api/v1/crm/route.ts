import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/v1/crm:
 *   get:
 *     summary: Liste tous les contacts CRM
 *     tags:
 *       - CRM
 *     responses:
 *       200:
 *         description: Liste des contacts CRM
 */
export async function GET() {
  return NextResponse.json([]);
}
