import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware d’audit log pour toutes les requêtes API sensibles
 * Logge l’action, l’utilisateur, l’IP, la date
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Log uniquement les actions critiques (auth, update, delete...)
  if (/api\/v1\/(auth|users|projects|finance|subsidiaries)/.test(pathname) && ["POST", "PUT", "DELETE"].includes(req.method)) {
    const log = {
      path: pathname,
      method: req.method,
      user: req.headers.get("x-user-id") || "anonymous",
      ip: req.ip || req.headers.get("x-forwarded-for") || "unknown",
      date: new Date().toISOString(),
    };
    // À brancher avec la base de logs (ex: Firestore, Mongo, etc.)
    console.log("[AUDIT]", log);
  }
  return NextResponse.next();
}
