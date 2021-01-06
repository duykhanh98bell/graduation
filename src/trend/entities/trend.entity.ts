import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrendDocument = Trend & Document;

@Schema()
export class Trend {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ unique: true })
  slug: string;

  @Prop()
  avatar: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: true })
  nav_active: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TrendSchema = SchemaFactory.createForClass(Trend);
