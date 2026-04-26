import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../../domain/ports/film.repository.port';
import { InjectModel } from '@nestjs/mongoose';
import { Film, FilmDocument } from './film.schema';
import { Model } from 'mongoose';
import { Session } from '../../domain/models/film.model';

@Injectable()
export class FilmRepositoryMongo extends FilmRepository {
  constructor(
    @InjectModel(Film.name)
    private readonly filmModel: Model<FilmDocument>,
  ) {
    super();
  }

  async getAll(): Promise<Film[]> {
    return this.filmModel.find().select('-schedule');
  }
  async getById(id: string): Promise<Session[]> {
    return this.filmModel.findOne({ id });
  }
}
