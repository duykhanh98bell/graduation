import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PolicyDocument = Policy & Document;

@Schema()
export class Policy {
  @Prop()
  content: string;
}

export const PolicySchema = SchemaFactory.createForClass(Policy);
