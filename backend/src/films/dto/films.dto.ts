import { Film } from '../domain/entities/film.entity';

export class FilmsListResponseDto {
  total: number;
  items: Film[];
}
