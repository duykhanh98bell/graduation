import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SliderDocument = Slider & Document;

@Schema()
export class Slider {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const SliderSchema = SchemaFactory.createForClass(Slider);
