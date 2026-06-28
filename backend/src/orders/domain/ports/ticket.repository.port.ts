import { Ticket, TicketDraft } from '../entities/ticket.entity';

export abstract class TicketRepository {
  // abstract save(ticket: Ticket);
  abstract saveMany(tickets: Ticket[], orderId: string): Promise<Ticket[]>;
  abstract findOccupiedSeats(tickets: TicketDraft[]): Promise<Ticket[]>;
  abstract getBySessionId(sessionId: string): Promise<Ticket[]>;
}
