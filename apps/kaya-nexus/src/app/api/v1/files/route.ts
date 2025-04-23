// Endpoint API REST - Fichiers/documents (upload, partage)
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/files/service';
import { z } from 'zod';

const uploadSchema = z.object({ name: z.string(), size: z.number(), type: z.string() });
const shareSchema = z.object({ fileId: z.string(), targetUserId: z.string() });

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const files = await service.getFilesForUser(user.id);
  return NextResponse.json(files);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = uploadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const file = await service.uploadFile(user.id, parsed.data);
  return NextResponse.json(file);
}

export async function PUT(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = shareSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const shared = await service.shareFile(parsed.data.fileId, parsed.data.targetUserId);
  return NextResponse.json(shared);
}
