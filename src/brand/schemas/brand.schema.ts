/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BrandDocument = Brand & Document;

@Schema()
export class Brand {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
