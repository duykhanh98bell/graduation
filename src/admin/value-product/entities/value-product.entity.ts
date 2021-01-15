import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Value } from 'src/admin/value/entities/value.entity';
import { Product } from 'src/admin/product/entities/product.entity';

export type ValueProductDocument = ValueProduct & Document;

@Schema()
export class ValueProduct {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Value' })
  value_id: Value;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product_id: Product;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ValueProductSchema = SchemaFactory.createForClass(ValueProduct);
