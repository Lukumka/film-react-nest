import { Injectable } from '@nestjs/common';
import { FilmRepository } from './domain/ports/film.repository.port';
import { TicketRepository } from '../orders/domain/ports/ticket.repository.port';
import { SessionRepository } from './domain/ports/session.repository.port';

@Injectable()
export class FilmsService {
  constructor(
    private readonly filmRepository: FilmRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly ticketRepository: TicketRepository,
  ) {}
  async getAll() {
    const items = await this.filmRepository.getAll();

    return {
      total: items.length,
      items: items,
    };
  }
  async getSchedule(filmId: string) {
    const sessions = await this.sessionRepository.getByFilmId(filmId);

    const items = await Promise.all(
      sessions.map(async (session) => {
        const tickets = await this.ticketRepository.getBySessionId(session.id);

        return {
          id: session.id,
          daytime: session.daytime,
          hall: String(session.hall),
          rows: session.rows,
          seats: session.seats,
          price: session.price,
          taken: tickets.map((ticket) => `${ticket.row}:${ticket.seat}`),
        };
      }),
    );

    return {
      total: items.length,
      items,
    };
  }
}
