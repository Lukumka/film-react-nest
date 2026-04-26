import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionEntity } from '../../../../films/infrastructure/postgres/entities/session.entity';
import { OrderEntity } from './order.entity';

@Entity('tickets')
export class TicketEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SessionEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'session_id' })
  session: SessionEntity;

  @Column({ name: 'session_id', type: 'uuid' })
  sessionId: string;

  @Column({ type: 'int' })
  row: number;

  @Column({ type: 'int' })
  seat: number;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => OrderEntity, (order) => order.tickets, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @Column({ name: 'order_id', type: 'uuid' })
  orderId: string;
}
