import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag.entity';
import { SessionEntity } from './session.entity';

@Entity('films')
export class FilmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'numeric',
    precision: 3,
    scale: 1,
    default: 0,
    transformer: {
      to: (v: number) => v,
      from: (v: string) => Number(v),
    },
  })
  rating: number;
  @Column({ type: 'text', nullable: false })
  director: string;
  @ManyToMany(() => Tag, (tag) => tag.title)
  @JoinTable()
  tags: Tag[];
  @Column()
  image: string;
  @Column()
  cover: string;
  @Column({ type: 'varchar', nullable: false })
  title: string;
  @Column({ type: 'text', nullable: true })
  about: string;
  @Column({ type: 'text', nullable: false })
  description: string;
  @OneToMany(() => SessionEntity, (SessionEntity) => SessionEntity.film)
  schedule: SessionEntity[];
}
