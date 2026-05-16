import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

import { AppConfig, CONFIG, configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { join } from 'path';
import { OrdersController } from './orders/orders.controller';
import { FilmRepository } from './films/domain/ports/film.repository.port';

import { OrderRepository } from './orders/domain/ports/order.repository.port';
import { OrderService } from './orders/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './films/infrastructure/postgres/entities/session.entity';
import { Tag } from './films/infrastructure/postgres/entities/tag.entity';
import { FilmEntity } from './films/infrastructure/postgres/entities/film.entity';
import { FilmRepositoryPostgres } from './films/infrastructure/postgres/film.repository.postgres';
import { OrderRepositoryPostgres } from './orders/infrastructure/postgres/order.repository.postgres';
import { TicketEntity } from './orders/infrastructure/postgres/entities/ticket.entity';
import { OrderEntity } from './orders/infrastructure/postgres/entities/order.entity';
import { AppConfigModule } from './app.config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    AppConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [CONFIG],
      useFactory: (config: AppConfig) => ({
        type: 'postgres',
        host: config.database.url,
        port: config.database.port,
        database: config.database.dbName,
        username: config.database.username,
        password: config.database.password,
        entities: [FilmEntity, SessionEntity, Tag, TicketEntity, OrderEntity],
      }),
    }),
    TypeOrmModule.forFeature([
      FilmEntity,
      SessionEntity,
      Tag,
      OrderEntity,
      TicketEntity,
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
