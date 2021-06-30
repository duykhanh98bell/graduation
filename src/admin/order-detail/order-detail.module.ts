import { Global, Module } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDetail, OrderDetailSchema } from './entities/order-detail.entity';

@Global()
@Module({
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
  imports: [
    MongooseModule.forFeature([
      { name: OrderDetail.name, schema: OrderDetailSchema },
    ]),
  ],
  exports: [OrderDetailService],
})
export class OrderDetailModule {}
