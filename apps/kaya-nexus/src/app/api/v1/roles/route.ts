// Endpoint API REST - Gestion des rôles/permissions
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/roles/service';
import { z } from 'zod';

// Validation Zod pour assignation de rôle
const assignRoleSchema = z.object({ userId: z.string(), roleId: z.string() });

export async function GET() {
  // Liste tous les rôles (admin uniquement)
  // TODO: vérifier le rôle admin
  const roles = await service.getRoles();
  return NextResponse.json(roles);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = assignRoleSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  // TODO: vérifier le rôle admin
  const updated = await service.assignRoleToUser(parsed.data.userId, parsed.data.roleId);
  return NextResponse.json(updated);
}
