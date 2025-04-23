// Endpoint API REST - Feedback utilisateur
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/feedback/service';
import { z } from 'zod';

const feedbackSchema = z.object({ type: z.string(), message: z.string(), rating: z.number().optional() });

export async function GET() {
  // Liste les feedbacks récents (admin uniquement à adapter)
  const feedbacks = await service.getFeedbacks();
  return NextResponse.json(feedbacks);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = feedbackSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const feedback = await service.submitFeedback(user.id, parsed.data.type, parsed.data.message, parsed.data.rating);
  return NextResponse.json(feedback);
}
