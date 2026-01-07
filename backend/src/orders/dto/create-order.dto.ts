import { Ticket } from '../domain/entities/order.entity';

export class CreateOrderDto {
  tickets: Ticket[];
}

export class CreateOrderResponseDto {
  total: number;
  items: (Ticket & { id: string })[];
}
