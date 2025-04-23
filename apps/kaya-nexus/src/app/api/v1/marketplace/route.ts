// Endpoint API REST - Marketplace/extensions
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/marketplace/service';
import { z } from 'zod';

const installSchema = z.object({ extensionId: z.string() });

export async function GET() {
  // Liste toutes les extensions publiées
  const extensions = await service.listExtensions();
  return NextResponse.json(extensions);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = installSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const installed = await service.installExtension(user.id, parsed.data.extensionId);
  return NextResponse.json(installed);
}

export async function DELETE(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = installSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const removed = await service.uninstallExtension(user.id, parsed.data.extensionId);
  return NextResponse.json(removed);
}
