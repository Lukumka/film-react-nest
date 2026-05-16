import { Film, Session } from '../models/film.model';

export abstract class FilmRepository {
  abstract getAll(): Promise<Film[]>;
  abstract getById(id: string): Promise<Session[]>;
}
