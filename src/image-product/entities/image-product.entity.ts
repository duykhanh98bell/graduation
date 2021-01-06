import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import * as mongoose from 'mongoose';

export type ImageProductDocument = ImageProduct & Document;

@Schema()
export class ImageProduct {
  @Prop({ required: true })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product_id: Product;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ImageProductSchema = SchemaFactory.createForClass(ImageProduct);
