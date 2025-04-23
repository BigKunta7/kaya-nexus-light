// Endpoint API REST - Chat interne (messages directs, salons)
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/chat/service';
import { z } from 'zod';

const sendMessageSchema = z.object({ chatId: z.string(), content: z.string() });

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const chats = await service.getChatsForUser(user.id);
  return NextResponse.json(chats);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = sendMessageSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const msg = await service.sendMessage(parsed.data.chatId, user.id, parsed.data.content);
  return NextResponse.json(msg);
}
