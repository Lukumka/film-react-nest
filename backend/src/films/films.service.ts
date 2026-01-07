import { Injectable } from '@nestjs/common';
import { FilmRepository } from './domain/ports/film.repository.port';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepository: FilmRepository) {}
  async getAll() {
    const items = await this.filmRepository.getAll();
    return {
      total: items.length,
      items: items,
    };
  }
  async getSchedule(id: string) {
    const film = await this.filmRepository.getById(id);
    return { total: film.schedule.length, items: film.schedule };
  }
}
