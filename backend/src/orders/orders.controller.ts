import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderResponseDto } from './dto/order-response.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  createOrder(@Body() data: CreateOrderDto): Promise<CreateOrderResponseDto> {
    return this.orderService.createOrder(data);
  }
}
