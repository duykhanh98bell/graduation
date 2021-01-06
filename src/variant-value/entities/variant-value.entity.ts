import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Variant } from 'src/variant/entities/variant.entity';
import { Value } from 'src/value/entities/value.entity';

export type VariantValueDocument = VariantValue & Document;

@Schema()
export class VariantValue {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' })
  variant_id: Variant;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Value' })
  value_id: Value;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const VariantValueSchema = SchemaFactory.createForClass(VariantValue);
