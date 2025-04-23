// Endpoint API REST - Tickets/support
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import * as service from '@/modules/support/service';
import { z } from 'zod';

const createTicketSchema = z.object({ subject: z.string(), description: z.string(), priority: z.string() });
const assignSchema = z.object({ ticketId: z.string(), agentId: z.string() });
const statusSchema = z.object({ ticketId: z.string(), status: z.string() });

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const tickets = await service.getTicketsForUser(user.id);
  return NextResponse.json(tickets);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const body = await req.json();
  const parsed = createTicketSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const ticket = await service.createTicket(user.id, parsed.data.subject, parsed.data.description, parsed.data.priority);
  return NextResponse.json(ticket);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  if (assignSchema.safeParse(body).success) {
    const { ticketId, agentId } = body;
    const assigned = await service.assignTicket(ticketId, agentId);
    return NextResponse.json(assigned);
  }
  if (statusSchema.safeParse(body).success) {
    const { ticketId, status } = body;
    const updated = await service.updateTicketStatus(ticketId, status);
    return NextResponse.json(updated);
  }
  return NextResponse.json({ error: 'Validation' }, { status: 400 });
}
