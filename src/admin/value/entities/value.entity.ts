import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Attribute } from '../../attribute/entities/attribute.entity';

export type ValueDocument = Value & Document;

@Schema()
export class Value {
  @Prop({ required: true })
  value: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attribute' })
  attribute_id: Attribute;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ValueSchema = SchemaFactory.createForClass(Value);
