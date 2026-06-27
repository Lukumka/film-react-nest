export interface TicketDraft {
  sessionId: string;
  row: number;
  seat: number;
  price: number;
}

export interface Ticket extends TicketDraft {
  id: string;
  orderId: string;
}
