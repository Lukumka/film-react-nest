import { Order } from '../entities/order.entity';

export abstract class OrderRepository {
  abstract save(data: Order): Promise<Order>;
}
