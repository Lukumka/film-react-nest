export interface CreateTicketDto {
  film: string;
  session: string;
  daytime: Date;
  row: number;
  seat: number;
  price: number;
}
