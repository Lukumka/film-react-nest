export interface TicketResponseDto {
  id: string;
  film: string;
  session: string;
  daytime: Date;
  row: number;
  seat: number;
  price: number;
}
