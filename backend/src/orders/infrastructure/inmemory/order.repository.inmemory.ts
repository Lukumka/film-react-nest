import { OrderRepository } from '../../domain/ports/order.repository.port';
import { CreateOrderDto } from '../../dto/create-order.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { Ticket } from '../../domain/entities/order.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderRepositoryInMemory implements OrderRepository {
  private tickets: Array<Ticket> = [];
  private findTicket(ticket: Ticket) {
    return this.tickets.find(
      (t) =>
        t.session === ticket.session &&
        t.row === ticket.row &&
        t.seat === ticket.seat,
    );
  }

  async create(data: CreateOrderDto) {
    const resTickets = [];
    for (const ticket of data.tickets) {
      const duplicate = this.findTicket(ticket);
      if (duplicate) {
        throw new ConflictException(
          `Билет уже занят: event=${duplicate.film}, row=${duplicate.row}, seat=${duplicate.seat}`,
        );
      }
      const orderTicket = { ...ticket, id: uuid() };
      resTickets.push(orderTicket);
    }
    this.tickets.push(...resTickets);
    return {
      id: uuid(),
      totalPrice: this.tickets.reduce((acc, t) => acc + t.price, 0),
      tickets: this.tickets,
    };
  }
}
