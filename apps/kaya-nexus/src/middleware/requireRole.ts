import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';

/**
 * Middleware RBAC pour Next.js API routes.
 * Vérifie que l'utilisateur possède l'un des rôles requis (dans le custom claim Firebase 'role').
 * @param roles Rôles autorisés (ex: ['admin', 'user'])
 * @param handler Handler API Next.js
 */
export function requireRole(
  roles: string[],
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    const token = authHeader.replace('Bearer ', '');
    try {
      // On suppose que Firebase Admin est initialisé côté serveur
      const decoded = await getAuth().verifyIdToken(token);
      if (!roles.includes(decoded.role)) {
        return NextResponse.json({ error: 'Accès refusé (rôle)' }, { status: 403 });
      }
      // Ajout du user dans la requête si besoin (à étendre)
      // req.user = decoded;
      return handler(req);
    } catch {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
  };
}
