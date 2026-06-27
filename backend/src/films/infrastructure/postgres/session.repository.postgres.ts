import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../../domain/models/film.model';
import { SessionEntity } from './entities/session.entity';
import { SessionRepository } from '../../domain/ports/session.repository.port';

@Injectable()
export class SessionRepositoryPostgres extends SessionRepository {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {
    super();
  }
  async getByFilmId(filmId: string): Promise<Session[]> {
    const entities = await this.sessionRepository.find({
      where: {
        film: {
          id: filmId,
        },
      },
      relations: ['film'],
    });

    return entities.map((entity) => ({
      id: entity.id,
      daytime: entity.daytime,
      hall: entity.hall,
      rows: entity.rows,
      seats: entity.seats,
      price: entity.price,
      filmId: entity.film.id,
    }));
  }
}
