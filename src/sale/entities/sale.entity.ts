import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SaleDocument = Sale & Document;

@Schema()
export class Sale {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  percent: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
