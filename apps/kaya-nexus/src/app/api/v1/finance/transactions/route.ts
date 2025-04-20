import { NextRequest, NextResponse } from 'next/server';
import { transactionSchema } from '@/modules/finance/schema';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/middleware/requireRole';

export const GET = requireRole(['user', 'admin'], async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from('transactions').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
});

export const POST = requireRole(['admin'], async (req: NextRequest) => {
  const body = await req.json();
  const parse = transactionSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ errors: parse.error.flatten().fieldErrors }, { status: 400 });
  }
  const supabase = createClient();
  const { data, error } = await supabase.from('transactions').insert([parse.data]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
});

export const PUT = requireRole(['admin'], async (req: NextRequest) => {
  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: 'ID requis' }, { status: 400 });
  const parse = transactionSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ errors: parse.error.flatten().fieldErrors }, { status: 400 });
  }
  const supabase = createClient();
  const { data, error } = await supabase.from('transactions').update(parse.data).eq('id', body.id).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
});

export const DELETE = requireRole(['admin'], async (req: NextRequest) => {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID requis' }, { status: 400 });
  const supabase = createClient();
  const { error } = await supabase.from('transactions').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
});
