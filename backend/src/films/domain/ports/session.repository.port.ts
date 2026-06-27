import { Session } from '../models/film.model';

export abstract class SessionRepository {
  abstract getByFilmId(filmId: string): Promise<Session[]>;
}
