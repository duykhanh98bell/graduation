// export class Blog {}
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true })
export class Blog {
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

export const BlogSchema = SchemaFactory.createForClass(Blog);
