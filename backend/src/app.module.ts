import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { join } from 'path';
import { OrdersController } from './orders/orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmRepository } from './films/domain/ports/film.repository.port';
import { FilmRepositoryMongo } from './films/infrastructure/mongodb/film.repository.mongo';
import { Film, FilmSchema } from './films/infrastructure/mongodb/film.schema';
import { OrderRepository } from './orders/domain/ports/order.repository.port';
import { OrderService } from './orders/orders.service';
import { OrderRepositoryMongo } from './orders/infrastructure/mongodb/order.repository.mongo';
import {
  Order,
  OrderSchema,
} from './orders/infrastructure/mongodb/order.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get<string>('DATABASE_URL', 'mongodb://localhost:27017/prac'),
      }),
    }),
    MongooseModule.forFeature([
      { name: Film.name, schema: FilmSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  controllers: [FilmsController, OrdersController],
  providers: [
    configProvider,
    { provide: OrderRepository, useClass: OrderRepositoryMongo },
    OrderService,
    { provide: FilmRepository, useClass: FilmRepositoryMongo },
    FilmsService,
  ],
})
export class AppModule {}
