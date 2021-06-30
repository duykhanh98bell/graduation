import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PromotionDocument = Promotion & Document;

@Schema({ timestamps: true })
export class Promotion {
  @Prop({ required: true })
  name: string;

  @Prop()
  percent: number;

  @Prop()
  start_date: Date;

  @Prop()
  end_date: Date;

  @Prop()
  product_id: string[];
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
