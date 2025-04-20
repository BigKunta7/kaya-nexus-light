import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/modules/crm/schema';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/middleware/requireRole';
import { isContactInput } from '@/modules/crm/schema';

export const GET = requireRole(['user', 'admin'], async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from('contacts').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
});

export const POST = requireRole(['admin'], async (req: NextRequest) => {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 });
  }
  if (!isContactInput(body)) {
    return NextResponse.json({ error: 'Format contact invalide' }, { status: 400 });
  }
  const supabase = createClient();
  const { data, error } = await supabase.from('contacts').insert([body]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
});

export const PUT = requireRole(['admin'], async (req: NextRequest) => {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 });
  }
  if (!body || typeof body !== 'object' || !('id' in body)) {
    return NextResponse.json({ error: 'ID requis' }, { status: 400 });
  }
  if (!isContactInput(body)) {
    return NextResponse.json({ error: 'Format contact invalide' }, { status: 400 });
  }
  const supabase = createClient();
  const { data, error } = await supabase.from('contacts').update(body).eq('id', (body as any).id).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
});

export const DELETE = requireRole(['admin'], async (req: NextRequest) => {
  let id: unknown;
  try {
    const body = await req.json();
    id = body.id;
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 });
  }
  if (typeof id !== 'string' && typeof id !== 'number') {
    return NextResponse.json({ error: 'ID requis' }, { status: 400 });
  }
  const supabase = createClient();
  const { error } = await supabase.from('contacts').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
});
