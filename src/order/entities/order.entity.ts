import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Payment } from 'src/payment/entities/payment.entity';
import { Ship } from 'src/ship/entities/ship.entity';
import * as mongoose from 'mongoose';
import { Customer } from 'src/customer/entities/customer.entity';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  nameCustomer: string;

  @Prop({ required: true })
  phoneCustomer: string;

  @Prop({ required: true })
  emailCustomer: string;

  @Prop({ required: true })
  addressCustomer: string;

  @Prop()
  noteCustomer: string;

  @Prop({ default: false })
  status: boolean;

  @Prop({ required: true })
  sale: number;

  @Prop({ required: true, default: true })
  payment: boolean;

  @Prop({ required: true, default: true })
  ship: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  Customer_id: Customer;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
