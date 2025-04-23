// Endpoint API REST - Commentaires imbriqués
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/comments/service';
import { z } from 'zod';

const postCommentSchema = z.object({ targetId: z.string(), content: z.string(), parentId: z.string().optional() });

export async function GET(req: NextRequest) {
  // Récupère tous les commentaires d'une cible (ex: projet, message)
  const { searchParams } = new URL(req.url);
  const targetId = searchParams.get('targetId');
  if (!targetId) return NextResponse.json({ error: 'targetId requis' }, { status: 400 });
  const comments = await service.getCommentsForTarget(targetId);
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = postCommentSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const comment = await service.postComment(parsed.data.targetId, user.id, parsed.data.content, parsed.data.parentId);
  return NextResponse.json(comment);
}
