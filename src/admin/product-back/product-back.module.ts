import { Module } from '@nestjs/common';
import { ProductBackService } from './product-back.service';
import { ProductBackController } from './product-back.controller';
import { OrderService } from '../order/order.service';
import {
  OrderDetail,
  OrderDetailSchema,
} from '../order-detail/entities/order-detail.entity';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../order/entities/order.entity';
import { Customer, CustomerSchema } from '../customer/entities/customer.entity';
import { ProductBack } from './entities/product-back.entity';

@Module({
  controllers: [ProductBackController],
  providers: [ProductBackService, OrderService, OrderDetailService],
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    // MongooseModule.forFeature([
    //   { name: ProductBack.name, schema: ProductBackSchema },
    // ]),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    MongooseModule.forFeature([
      { name: OrderDetail.name, schema: OrderDetailSchema },
    ]),
  ],
})
export class ProductBackModule {}
