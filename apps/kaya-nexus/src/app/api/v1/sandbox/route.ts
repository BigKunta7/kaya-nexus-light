// Endpoint API REST - Sandbox/démo
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/sandbox/service';
import { z } from 'zod';

const createSandboxSchema = z.object({ config: z.any() });
const archiveSchema = z.object({ sandboxId: z.string() });

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const sandboxes = await service.getSandboxesForUser(user.id);
  return NextResponse.json(sandboxes);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = createSandboxSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const sandbox = await service.createSandbox(user.id, parsed.data.config);
  return NextResponse.json(sandbox);
}

export async function PUT(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = archiveSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const archived = await service.archiveSandbox(parsed.data.sandboxId);
  return NextResponse.json(archived);
}
