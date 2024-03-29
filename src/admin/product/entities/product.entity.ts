import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Brand } from 'src/admin/brand/schemas/brand.schema';
import { Trend } from 'src/admin/trend/entities/trend.entity';
import * as mongoose from 'mongoose';
import { Promotion } from 'src/admin/promotion/entities/promotion.entity';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' })
  promotion_id: Promotion;

  @Prop()
  promotion_active: boolean;

  @Prop({ default: null })
  description: string;

  @Prop({ default: null })
  detail: string;

  @Prop()
  status: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brand_id: Brand;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Trend' })
  // trend_id: Trend;
  @Prop()
  value: string[];

  @Prop({ required: true })
  image: string;

  @Prop({ default: true })
  highlight: boolean;

  @Prop()
  name_search: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
