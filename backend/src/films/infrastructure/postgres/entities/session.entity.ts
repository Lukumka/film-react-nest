import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FilmEntity } from './film.entity';

@Entity('sessions')
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  daytime: Date;
  @Column()
  hall: number;
  @Column()
  rows: number;
  @Column()
  seats: number;
  @Column()
  price: number;
  @ManyToOne(() => FilmEntity, (film) => film.schedule)
  @JoinColumn({ name: 'film_id' })
  film: FilmEntity;
}
