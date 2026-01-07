import { Film } from '../entities/film.entity';

export abstract class FilmRepository {
  abstract getAll(): Promise<Film[]>;
  abstract getById(id: string): Promise<Film>;
}
