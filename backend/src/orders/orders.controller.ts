import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './orders.service';
import { Ticket } from './domain/entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  createOrder(@Body() data: Ticket[]) {
    return this.orderService.create({ tickets: data });
  }
}
