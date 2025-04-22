import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/v1/stripe:
 *   post:
 *     summary: Crée un paiement Stripe
 *     tags:
 *       - Stripe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Paiement créé
 */
export async function POST(req: NextRequest) {
  return NextResponse.json({});
}
