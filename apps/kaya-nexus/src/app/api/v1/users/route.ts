import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Liste tous les utilisateurs
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *   post:
 *     summary: Crée un utilisateur
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
export async function GET() {
  return NextResponse.json([]);
}
export async function POST(req: NextRequest) {
  return NextResponse.json({});
}
