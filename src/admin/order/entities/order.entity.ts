import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Payment } from 'src/admin/payment/entities/payment.entity';
import { Ship } from 'src/admin/ship/entities/ship.entity';
import * as mongoose from 'mongoose';
import { Customer } from 'src/admin/customer/entities/customer.entity';

export type OrderDocument = Order & Document;

@Schema({
  timestamps: true,
})
export class Order {
  @Prop()
  code: string;

  @Prop({ required: true })
  total: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  customer_id: Customer;

  @Prop({ required: true })
  address: string;

  @Prop()
  note: string;

  @Prop({ default: 1 })
  status: number;

  @Prop()
  sale: number;

  @Prop()
  payment: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
