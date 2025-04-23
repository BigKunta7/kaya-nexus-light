// Endpoint API REST - Facturation/abonnements
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/billing/service';
import { z } from 'zod';

const createSubSchema = z.object({ plan: z.string(), stripeId: z.string().optional() });
const updateStatusSchema = z.object({ subscriptionId: z.string(), status: z.string() });

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const subs = await service.getSubscriptionsForUser(user.id);
  return NextResponse.json(subs);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = createSubSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const sub = await service.createSubscription(user.id, parsed.data.plan, parsed.data.stripeId);
  return NextResponse.json(sub);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const parsed = updateStatusSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const updated = await service.updateSubscriptionStatus(parsed.data.subscriptionId, parsed.data.status);
  return NextResponse.json(updated);
}
