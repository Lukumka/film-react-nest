import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { TicketRepository } from '../../domain/ports/ticket.repository.port';
import { Ticket, TicketDraft } from '../../domain/entities/ticket.entity';

@Injectable()
export class TicketRepositoryPostgres extends TicketRepository {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {
    super();
  }

  async saveMany(tickets: Ticket[], orderId: string): Promise<Ticket[]> {
    const entities = tickets.map((ticket) =>
      this.ticketRepository.create({
        id: ticket.id,
        orderId: orderId,
        sessionId: ticket.sessionId,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
      }),
    );

    const saved = await this.ticketRepository.save(entities);

    return saved.map((ticket) => ({
      id: ticket.id,
      orderId: ticket.orderId,
      sessionId: ticket.sessionId,
      row: ticket.row,
      seat: ticket.seat,
      price: ticket.price,
    }));
  }

  async findOccupiedSeats(tickets: TicketDraft[]): Promise<Ticket[]> {
    const occupiedSeats = await this.ticketRepository.find({
      where: tickets.map((ticket) => ({
        sessionId: ticket.sessionId,
        row: ticket.row,
        seat: ticket.seat,
      })),
    });

    return occupiedSeats.map((occupiedSeat) => ({
      id: occupiedSeat.id,
      orderId: occupiedSeat.orderId,
      sessionId: occupiedSeat.sessionId,
      row: occupiedSeat.row,
      seat: occupiedSeat.seat,
      price: occupiedSeat.price,
    }));
  }
  async getBySessionId(sessionId: string): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: {
        sessionId,
      },
    });
  }
}
