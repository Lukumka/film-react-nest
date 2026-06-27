import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderRepository } from '../../domain/ports/order.repository.port';
import { Order } from '../../domain/entities/order.entity';

import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderRepositoryPostgres extends OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {
    super();
  }
  async save(order: Order): Promise<Order> {
    const entity = this.orderRepository.create({
      id: order.id,
      totalPrice: order.totalPrice,
    });

    await this.orderRepository.save(entity);

    return order;
  }
}
