import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TicketEntity } from './ticket.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToMany(() => TicketEntity, (ticket) => ticket.order)
  tickets: TicketEntity[];
  @Column({ name: 'total_price', type: 'int' })
  totalPrice: number;
}
