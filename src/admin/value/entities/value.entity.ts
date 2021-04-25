import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Attribute } from '../../attribute/entities/attribute.entity';

export type ValueDocument = Value & Document;

@Schema({ timestamps: true })
export class Value {
  @Prop({ required: true })
  value: string;

  @Prop({ unique: true })
  code: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attribute' })
  attribute_id: Attribute;
}

export const ValueSchema = SchemaFactory.createForClass(Value);
