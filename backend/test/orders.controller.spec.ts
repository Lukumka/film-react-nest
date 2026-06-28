import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../src/orders/orders.controller';
import { OrderService } from '../src/orders/orders.service';
import { CreateOrderDto } from '../src/orders/dto/create-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;

  const orderServiceMock = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrderService,
          useValue: orderServiceMock,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call OrderService.createOrder with dto and return result', async () => {
    const dto: CreateOrderDto = {
      tickets: [
        {
          film: 'film-1',
          session: 'session-1',
          daytime: new Date('2026-06-20T12:00:00.000Z'),
          row: 1,
          seat: 1,
          price: 350,
        },
      ],
    };

    const result = {
      id: 'order-1',
      totalPrice: 350,
      tickets: dto.tickets,
    };

    orderServiceMock.createOrder.mockResolvedValue(result);

    await expect(controller.createOrder(dto)).resolves.toEqual(result);

    expect(orderServiceMock.createOrder).toHaveBeenCalledTimes(1);
    expect(orderServiceMock.createOrder).toHaveBeenCalledWith(dto);
  });
});
