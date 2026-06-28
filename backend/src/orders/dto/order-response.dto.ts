import { TicketResponseDto } from './ticket-response.dto';

export class CreateOrderResponseDto {
  total: number;
  items: TicketResponseDto[];
}
