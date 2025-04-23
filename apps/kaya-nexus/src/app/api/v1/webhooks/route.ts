// Endpoint API REST - Webhooks (gestion, déclenchement)
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/webhooks/service';
import { z } from 'zod';

const registerSchema = z.object({ url: z.string().url(), event: z.string() });

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const webhooks = await service.getWebhooksForUser(user.id);
  return NextResponse.json(webhooks);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const webhook = await service.registerWebhook(user.id, parsed.data.url, parsed.data.event);
  return NextResponse.json(webhook);
}

// Déclenchement de webhooks = logique interne, pas d'endpoint public direct
