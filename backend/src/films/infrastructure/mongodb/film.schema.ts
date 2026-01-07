import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SessionSchema } from './session.schema';
import { Session } from '../../domain/entities/film.entity';

export type FilmDocument = HydratedDocument<Film>;

@Schema()
export class Film {
  @Prop()
  id: string;
  @Prop()
  rating: number;
  @Prop()
  director: string;
  @Prop([String])
  tags: string[];
  @Prop()
  image: string;
  @Prop()
  cover: string;
  @Prop()
  title: string;
  @Prop()
  about: string;
  @Prop()
  description: string;
  @Prop({ type: [SessionSchema], default: [] })
  schedule: Session[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
