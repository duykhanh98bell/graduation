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
  @Prop({ required: true })
  total: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  customer_id: Customer;

  @Prop({ required: true })
  address: string;

  @Prop()
  note: string;

  @Prop({ default: false })
  status: boolean;

  @Prop({ required: true })
  sale: number;

  @Prop({ required: true })
  payment: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
