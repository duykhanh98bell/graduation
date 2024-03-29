import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/admin/product/entities/product.entity';
import { Category } from 'src/admin/category/entities/category.entity';
import { Global } from '@nestjs/common';

export type CategoryProductDocument = CategoryProduct & Document;

@Global()
@Schema()
export class CategoryProduct {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category_id: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product_id: Product;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CategoryProductSchema = SchemaFactory.createForClass(
  CategoryProduct,
);
