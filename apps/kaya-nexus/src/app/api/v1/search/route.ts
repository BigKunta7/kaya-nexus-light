// Endpoint API REST - Recherche intelligente
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/search/service';
import { z } from 'zod';

const searchSchema = z.object({ query: z.string() });

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const projects = await service.searchProjects(user.id, query);
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = searchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const messages = await service.searchMessages(user.id, parsed.data.query);
  return NextResponse.json(messages);
}
