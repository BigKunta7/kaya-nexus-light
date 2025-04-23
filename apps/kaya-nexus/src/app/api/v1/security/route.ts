// Endpoint API REST - Sécurité avancée (2FA, events)
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/security/service';
import { z } from 'zod';

const twoFASchema = z.object({ secret: z.string() });

export async function POST(req: NextRequest) {
  // Active la 2FA pour l’utilisateur courant
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = twoFASchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const result = await service.enable2FA(user.id, parsed.data.secret);
  return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
  // Désactive la 2FA pour l’utilisateur courant
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const result = await service.disable2FA(user.id);
  return NextResponse.json(result);
}
