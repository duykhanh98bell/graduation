import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/admin/category/entities/category.entity';
import { CategoryProductSchema } from 'src/admin/category-product/entities/category-product.entity';
import {
  Payment,
  PaymentSchema
} from 'src/admin/payment/entities/payment.entity';
import { Ship, ShipSchema } from 'src/admin/ship/entities/ship.entity';
import { Order, OrderSchema } from 'src/admin/order/entities/order.entity';
import {
  OrderDetail,
  OrderDetailSchema
} from 'src/admin/order-detail/entities/order-detail.entity';
import {
  Customer,
  CustomerSchema
} from 'src/admin/customer/entities/customer.entity';
import {
  Variant,
  VariantSchema
} from 'src/admin/variant/entities/variant.entity';
import { PaymentService } from 'src/admin/payment/payment.service';
import { Sale, SaleSchema } from 'src/admin/sale/entities/sale.entity';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService, PaymentService],
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    MongooseModule.forFeature([
      { name: 'CategoryProduct', schema: CategoryProductSchema }
    ]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([
      { name: OrderDetail.name, schema: OrderDetailSchema }
    ]),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema }
    ]),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema }
    ]),
    MongooseModule.forFeature([{ name: Variant.name, schema: VariantSchema }]),
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    MongooseModule.forFeature([{ name: Ship.name, schema: ShipSchema }]),
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }])
  ]
})
export class CheckoutModule {}
