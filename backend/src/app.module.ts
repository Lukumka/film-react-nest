import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { join } from 'path';
import { OrdersController } from './orders/orders.controller';
import { FilmRepository } from './films/domain/ports/film.repository.port';
// import { FilmRepositoryMongo } from './films/infrastructure/mongodb/film.repository.mongo';
import { Film, FilmSchema } from './films/infrastructure/mongodb/film.schema';
import { OrderRepository } from './orders/domain/ports/order.repository.port';
import { OrderService } from './orders/orders.service';
// import { OrderRepositoryMongo } from './orders/infrastructure/mongodb/order.repository.mongo';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './films/infrastructure/postgres/entities/session.entity';
import { Tag } from './films/infrastructure/postgres/entities/tag.entity';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Order,
  OrderSchema,
} from './orders/infrastructure/mongodb/order.schema';
import { FilmEntity } from './films/infrastructure/postgres/entities/film.entity';
import { FilmRepositoryPostgres } from './films/infrastructure/postgres/film.repository.postgres';
import { OrderRepositoryPostgres } from './orders/infrastructure/postgres/order.repository.postgres';
import { TicketEntity } from './orders/infrastructure/postgres/entities/ticket.entity';
import { OrderEntity } from './orders/infrastructure/postgres/entities/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest_project',
      entities: [FilmEntity, SessionEntity, Tag, TicketEntity, OrderEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      FilmEntity,
      SessionEntity,
      Tag,
      OrderEntity,
      TicketEntity,
    ]),
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
    { provide: OrderRepository, useClass: OrderRepositoryPostgres },
    OrderService,
    { provide: FilmRepository, useClass: FilmRepositoryPostgres },
    FilmsService,
  ],
})
export class AppModule {}
