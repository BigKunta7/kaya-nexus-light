// Endpoint API REST - Quotas et limites
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/quotas/service';
import { z } from 'zod';

const setQuotaSchema = z.object({ orgId: z.string(), type: z.string(), value: z.number() });
const getQuotaSchema = z.object({ orgId: z.string(), type: z.string() });

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get('orgId');
  const type = searchParams.get('type');
  if (!orgId || !type) return NextResponse.json({ error: 'orgId et type requis' }, { status: 400 });
  const quota = await service.getQuota(orgId, type);
  return NextResponse.json(quota);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = setQuotaSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const quota = await service.setQuota(parsed.data.orgId, parsed.data.type, parsed.data.value);
  return NextResponse.json(quota);
}

// PUT pour incrémentation d’usage à compléter selon logique métier
