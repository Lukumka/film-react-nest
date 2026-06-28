import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from './domain/ports/order.repository.port';
import { CreateOrderDto } from './dto/create-order.dto';
import { v4 as uuid } from 'uuid';
import { TicketRepository } from './domain/ports/ticket.repository.port';
import { Ticket, TicketDraft } from './domain/entities/ticket.entity';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly ticketRepository: TicketRepository,
  ) {}
  async createOrder(dto: CreateOrderDto): Promise<any> {
    const ticketDrafts: TicketDraft[] = dto.tickets.map((ticket) => ({
      sessionId: ticket.session,
      row: ticket.row,
      seat: ticket.seat,
      price: ticket.price,
    }));
    const occupiedSeats =
      await this.ticketRepository.findOccupiedSeats(ticketDrafts);

    if (occupiedSeats.length > 0) {
      this.logger.warn(
        `Attempt to book occupied seats: ${occupiedSeats.length}`,
      );
      throw new BadRequestException('Some seats are already occupied');
    }
    const orderId = uuid();

    const tickets: Ticket[] = ticketDrafts.map((ticket) => ({
      id: uuid(),
      orderId,
      ...ticket,
    }));
    this.logger.log(`Creating order with ${tickets.length} tickets`);
    const total = tickets.reduce((acc, ticket) => {
      return acc + ticket.price;
    }, 0);
    const newOrder = {
      id: orderId,
      totalPrice: total,
    };
    await this.orderRepository.save(newOrder);
    this.logger.log(`Order ${orderId} created. Total price: ${total}`);
    const newTickets = await this.ticketRepository.saveMany(tickets, orderId);
    return {
      total: newTickets.length,
      items: newTickets,
    };
  }
}
