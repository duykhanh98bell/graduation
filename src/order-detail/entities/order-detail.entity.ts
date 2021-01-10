import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Payment } from 'src/payment/entities/payment.entity';
import { Ship } from 'src/ship/entities/ship.entity';
import * as mongoose from 'mongoose';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { Order } from 'src/order/entities/order.entity';

export type OrderDetailDocument = OrderDetail & Document;

@Schema()
export class OrderDetail {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product_id: Product;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order_id: Order;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: true })
  status: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
