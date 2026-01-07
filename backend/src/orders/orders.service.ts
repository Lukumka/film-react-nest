import { Injectable } from '@nestjs/common';
import { OrderRepository } from './domain/ports/order.repository.port';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}
  create(dto: CreateOrderDto) {
    return this.orderRepository.create(dto);
  }
}
