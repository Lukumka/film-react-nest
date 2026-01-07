export interface Ticket {
  film: string;
  session: string;
  daytime: Date;
  row: number;
  seat: number;
  price: number;
}

export interface Order {
  id: string;
  totalPrice: number;
  tickets: Ticket[];
}
