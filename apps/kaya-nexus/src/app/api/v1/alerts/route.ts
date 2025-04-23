// Endpoint API REST - Alertes KPIs
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/alerts/service';
import { z } from 'zod';

const createAlertSchema = z.object({ type: z.string(), threshold: z.number(), target: z.string() });

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const alerts = await service.getAlertsForUser(user.id);
  return NextResponse.json(alerts);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = createAlertSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const alert = await service.createAlert(user.id, parsed.data.type, parsed.data.threshold, parsed.data.target);
  return NextResponse.json(alert);
}
