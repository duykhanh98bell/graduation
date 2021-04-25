import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Brand } from 'src/admin/brand/schemas/brand.schema';
import { Trend } from 'src/admin/trend/entities/trend.entity';
import * as mongoose from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  product_slug: string;

  @Prop({ required: true, unique: true })
  product_code: string;

  @Prop()
  price_in: number;

  @Prop()
  price_old: number;

  @Prop()
  price: number;

  @Prop({ default: null })
  description: string;

  @Prop({ default: null })
  detail: string;

  @Prop()
  status: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brand_id: Brand;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Trend' })
  trend_id: Trend;

  @Prop({ required: true })
  image: string;

  @Prop({ default: true })
  highlight: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
