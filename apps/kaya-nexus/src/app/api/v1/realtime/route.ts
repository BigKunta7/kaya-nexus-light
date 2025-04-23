// Endpoint API REST - Notifications temps réel (squelette)
import { NextRequest, NextResponse } from 'next/server';
import * as service from '@/modules/realtime/service';
import { z } from 'zod';

const notifySchema = z.object({ userId: z.string(), payload: z.any() });
const broadcastSchema = z.object({ roomId: z.string(), payload: z.any() });

export async function POST(req: NextRequest) {
  // Notifier un utilisateur (admin ou système)
  const body = await req.json();
  const parsed = notifySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  await service.notifyUser(parsed.data.userId, parsed.data.payload);
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  // Broadcast à une salle (admin ou système)
  const body = await req.json();
  const parsed = broadcastSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  await service.broadcastToRoom(parsed.data.roomId, parsed.data.payload);
  return NextResponse.json({ ok: true });
}
