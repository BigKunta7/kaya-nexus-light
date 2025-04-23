import { NextRequest, NextResponse } from "next/server";

/**
 * Récupère l'adresse IP du client à partir des headers de la requête.
 * @param req La requête Next.js
 * @returns L'adresse IP ou undefined
 */
function getClientIp(req: NextRequest): string | undefined {
  // Vérifie l'en-tête x-forwarded-for (proxy/reverse proxy)
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Prend la première IP si plusieurs sont présentes
    return forwardedFor.split(',')[0].trim();
  }
  // Sinon, tente x-real-ip
  return req.headers.get('x-real-ip') ?? undefined;
}

/**
 * Middleware d’audit log pour toutes les requêtes API sensibles
 * Logge l’action, l’utilisateur, l’IP, la date
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Log uniquement les actions critiques (auth, update, delete...)
  if (/api\/v1\/(auth|users|projects|finance|subsidiaries)/.test(pathname) && ["POST", "PUT", "DELETE"].includes(req.method)) {
    const ip = getClientIp(req);
    const log = {
      path: pathname,
      method: req.method,
      user: req.headers.get("x-user-id") || "anonymous",
      ip: ip || "unknown",
      date: new Date().toISOString(),
    };
    // À brancher avec la base de logs (ex: Firestore, Mongo, etc.)
    console.log("[AUDIT]", log);
  }
  return NextResponse.next();
}
