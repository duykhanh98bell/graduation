import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @Prop()
  content: string;

  // @Prop()
  // email: string;

  // @Prop()
  // phone: string;

  // @Prop()
  // introduce: string;

  // @Prop({ default: Date.now })
  // createdAt: Date;

  // @Prop({ default: Date.now })
  // updatedAt: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
