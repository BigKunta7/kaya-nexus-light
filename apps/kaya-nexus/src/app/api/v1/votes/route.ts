// Endpoint API REST - Votes/sondages
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/votes/service';
import { z } from 'zod';

const createPollSchema = z.object({ question: z.string(), options: z.array(z.string()) });
const voteSchema = z.object({ pollOptionId: z.string() });

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pollId = searchParams.get('pollId');
  if (!pollId) return NextResponse.json({ error: 'pollId requis' }, { status: 400 });
  const results = await service.getPollResults(pollId);
  return NextResponse.json(results);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = createPollSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const poll = await service.createPoll(parsed.data.question, parsed.data.options, user.id);
  return NextResponse.json(poll);
}

export async function PUT(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = voteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const vote = await service.vote(parsed.data.pollOptionId, user.id);
  return NextResponse.json(vote);
}
