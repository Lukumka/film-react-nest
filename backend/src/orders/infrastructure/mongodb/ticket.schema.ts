import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Ticket {
  @Prop()
  film: string;
  @Prop()
  session: string;
  @Prop()
  daytime: Date;
  @Prop()
  row: number;
  @Prop()
  seat: number;
  @Prop()
  price: number;
  @Prop()
  orderId: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
