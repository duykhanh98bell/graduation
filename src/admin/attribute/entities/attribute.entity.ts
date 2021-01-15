import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttributeDocument = Attribute & Document;

@Schema()
export class Attribute {
  @Prop({ unique: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);
