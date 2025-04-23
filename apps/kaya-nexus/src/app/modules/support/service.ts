// Service de tickets/support (création, suivi, priorisation, assignation)
import { prisma } from '@/lib/prisma';

export async function createTicket(userId: string, subject: string, description: string, priority: string) {
  return prisma.ticket.create({ data: { userId, subject, description, priority, status: 'open' } });
}

export async function getTicketsForUser(userId: string) {
  return prisma.ticket.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
}

export async function assignTicket(ticketId: string, agentId: string) {
  return prisma.ticket.update({ where: { id: ticketId }, data: { agentId, status: 'assigned' } });
}

export async function updateTicketStatus(ticketId: string, status: string) {
  return prisma.ticket.update({ where: { id: ticketId }, data: { status } });
}
