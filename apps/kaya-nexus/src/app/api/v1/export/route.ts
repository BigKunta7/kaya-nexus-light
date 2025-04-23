// Endpoint API REST - Export (CSV, PDF, Excel)
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/export/service';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  // Export CSV des projets de l'utilisateur
  const csv = await service.exportProjectsCSV(user.id);
  return NextResponse.json(csv);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  // Export PDF analytics (à compléter)
  const pdf = await service.exportAnalyticsPDF(user.id);
  return NextResponse.json({ pdf });
}
