import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/admin/category/entities/category.entity';
import { CategoryProductSchema } from 'src/admin/category-product/entities/category-product.entity';
import { PaymentSchema } from 'src/admin/payment/entities/payment.entity';
import { ShipSchema } from 'src/admin/ship/entities/ship.entity';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService],
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    MongooseModule.forFeature([
      { name: 'CategoryProduct', schema: CategoryProductSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
    MongooseModule.forFeature([{ name: 'Ship', schema: ShipSchema }]),
  ],
})
export class CheckoutModule {}
