// Endpoint API REST - Organisations/filiales (multi-tenant)
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/organization/service';
import { z } from 'zod';

const createOrgSchema = z.object({ name: z.string() });
const inviteSchema = z.object({ orgId: z.string(), userId: z.string(), role: z.string() });

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const orgs = await service.getOrganizationsForUser(user.id);
  return NextResponse.json(orgs);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = createOrgSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const org = await service.createOrganization(parsed.data.name, user.id);
  return NextResponse.json(org);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const parsed = inviteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const invited = await service.inviteUserToOrganization(parsed.data.orgId, parsed.data.userId, parsed.data.role);
  return NextResponse.json(invited);
}
