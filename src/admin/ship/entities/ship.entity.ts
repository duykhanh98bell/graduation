import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShipDocument = Ship & Document;

@Schema()
export class Ship {
  @Prop({ unique: true })
  name: string;

  @Prop()
  price: number;

  @Prop()
  logo: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ShipSchema = SchemaFactory.createForClass(Ship);
