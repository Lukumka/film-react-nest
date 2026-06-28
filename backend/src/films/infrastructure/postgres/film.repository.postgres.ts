import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilmRepository } from '../../domain/ports/film.repository.port';
// import { Film as FilmModel } from '../../domain/models/film.model';
import { FilmEntity } from './entities/film.entity';
import { instanceToPlain } from 'class-transformer';
import { Film, Session } from '../../domain/models/film.model';
import { SessionEntity } from './entities/session.entity';

@Injectable()
export class FilmRepositoryPostgres extends FilmRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmRepository: Repository<FilmEntity>,
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {
    super();
  }

  async getAll(): Promise<Film[]> {
    const entities = await this.filmRepository.find({
      relations: ['tags'],
    });

    return entities.map((entity) => ({
      id: entity.id,
      rating: entity.rating,
      director: entity.director,
      title: entity.title,
      about: entity.about,
      description: entity.description,
      image: entity.image,
      cover: entity.cover,
      tags: entity.tags.map((tag) => tag.title),
    }));
  }
  async getById(id: string): Promise<any> {
    const schedule = await this.sessionRepository.find({
      where: {
        film: {
          id: id,
        },
      },
    });
    return instanceToPlain(schedule) as Session[];
  }
}
