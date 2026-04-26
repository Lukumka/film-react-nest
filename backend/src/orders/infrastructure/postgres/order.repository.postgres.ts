import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../../../films/domain/ports/film.repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmEntity } from '../../../films/infrastructure/postgres/entities/film.entity';
import { Repository } from 'typeorm';
import { SessionEntity } from '../../../films/infrastructure/postgres/entities/session.entity';
import { OrderRepository } from '../../domain/ports/order.repository.port';
import { CreateOrderDto } from '../../dto/create-order.dto';
import { Order, Ticket } from '../../domain/entities/order.entity';
import { TicketEntity } from './entities/ticket.entity';
import { OrderEntity } from './entities/order.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderRepositoryPostgres extends OrderRepository {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketsRepository: Repository<TicketEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {
    super();
  }
  async create(data: CreateOrderDto): Promise<Order> {
    const orderId = uuid();
    const total = data.tickets.reduce((acc, ticket) => {
      return acc + ticket.price;
    }, 0);
    const newOrder = this.orderRepository.create({
      id: orderId,
      totalPrice: total,
    });
    await this.orderRepository.save(newOrder);
    const savedTickets = [];
    for (const ticket of data.tickets) {
      const newTicket = this.ticketsRepository.create({
        id: uuid(),
        orderId,
        sessionId: ticket.session,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
      });
      savedTickets.push(newTicket);
      await this.ticketsRepository.save(newTicket);
    }
    return {
      id: orderId,
      totalPrice: total,
      tickets: savedTickets,
    };
  }
}
