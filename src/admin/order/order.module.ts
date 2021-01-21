import { Global, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './entities/order.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDetailService } from '../order-detail/order-detail.service';
import {
  OrderDetail,
  OrderDetailSchema,
} from '../order-detail/entities/order-detail.entity';

@Global()
@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([
      { name: OrderDetail.name, schema: OrderDetailSchema },
    ]),
  ],
})
export class OrderModule {}
