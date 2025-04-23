// Endpoint API REST - API publique (gestion des clés)
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/publicApi/service';
import { z } from 'zod';

const createKeySchema = z.object({ name: z.string() });
const revokeSchema = z.object({ keyId: z.string() });

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const keys = await service.getApiKeysForUser(user.id);
  return NextResponse.json(keys);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = createKeySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const key = await service.createApiKey(user.id, parsed.data.name);
  return NextResponse.json(key);
}

export async function DELETE(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = revokeSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const revoked = await service.revokeApiKey(parsed.data.keyId);
  return NextResponse.json(revoked);
}
