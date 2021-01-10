import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import * as mongoose from 'mongoose';

export type VariantDocument = Variant & Document;

@Schema()
export class Variant {
  _id: any;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ default: 0 })
  sold: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product_id: Product;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const VariantSchema = SchemaFactory.createForClass(Variant);
