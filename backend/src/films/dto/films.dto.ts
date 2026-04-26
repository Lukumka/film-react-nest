import { Film } from '../domain/models/film.model';

export class FilmsListResponseDto {
  total: number;
  items: Film[];
}
