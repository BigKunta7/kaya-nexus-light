// Endpoint API REST - Logs d’audit
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/audit/service';
import { z } from 'zod';

const logSchema = z.object({ action: z.string(), meta: z.any().optional() });

export async function GET() {
  // Liste des logs d’audit (admin uniquement)
  // TODO: vérifier le rôle admin
  const logs = await service.getAuditLogs();
  return NextResponse.json(logs);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = logSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const log = await service.logAudit(parsed.data.action, user.id, parsed.data.meta);
  return NextResponse.json(log);
}
