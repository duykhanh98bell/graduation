import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../order/entities/order.entity';
import { Customer, CustomerSchema } from '../customer/entities/customer.entity';
import {
  OrderDetail,
  OrderDetailSchema
} from '../order-detail/entities/order-detail.entity';
import { OrderService } from '../order/order.service';
import { ShipSchema } from '../ship/entities/ship.entity';

@Module({
  controllers: [BillController],
  providers: [BillService, OrderService],
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Ship', schema: ShipSchema }]),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema }
    ]),
    MongooseModule.forFeature([
      { name: OrderDetail.name, schema: OrderDetailSchema }
    ])
  ]
})
export class BillModule {}
