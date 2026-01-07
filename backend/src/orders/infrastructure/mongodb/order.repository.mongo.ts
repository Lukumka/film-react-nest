import { OrderRepository } from '../../domain/ports/order.repository.port';
import { CreateOrderDto } from '../../dto/create-order.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './order.schema';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import {
  Film,
  FilmDocument,
} from '../../../films/infrastructure/mongodb/film.schema';

@Injectable()
export class OrderRepositoryMongo extends OrderRepository {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Film.name)
    private readonly filmModel: Model<FilmDocument>,
  ) {
    super();
  }

  async create(data: CreateOrderDto) {
    for (const ticket of data.tickets) {
      const film = await this.filmModel.find({ id: ticket.film });
      if (film.length === 0) {
        throw new NotFoundException('Film not found');
      }
      const session = film[0].schedule.find(
        (s) => s.id === ticket.session && s.daytime === ticket.daytime,
      );
      if (!session) {
        throw new NotFoundException('Session not found');
      }
      const seatKey = `${ticket.row}:${ticket.seat}`;
      const place = session.taken.find((place) => place === seatKey);
      if (place) {
        throw new NotFoundException('Place already taken');
      }
      await this.filmModel
        .updateOne(
          { id: ticket.film, 'schedule.id': ticket.session },
          { $addToSet: { 'schedule.$.taken': seatKey } },
        )
        .exec();
    }
    return await this.orderModel.create({
      id: uuid(),
      totalPrice: data.tickets.reduce((total, item) => total + item.price, 0),
      ...data,
    });
  }
}
