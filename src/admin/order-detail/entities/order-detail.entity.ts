import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Payment } from 'src/admin/payment/entities/payment.entity';
import { Ship } from 'src/admin/ship/entities/ship.entity';
import * as mongoose from 'mongoose';
import { Customer } from 'src/admin/customer/entities/customer.entity';
import { Product } from 'src/admin/product/entities/product.entity';
import { Order } from 'src/admin/order/entities/order.entity';

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
