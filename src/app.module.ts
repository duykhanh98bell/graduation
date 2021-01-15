import { Global, Module } from '@nestjs/common';
import { BrandModule } from './admin/brand/brand.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AttributeModule } from './admin/attribute/attribute.module';
import { PaymentModule } from './admin/payment/payment.module';
import { ShipModule } from './admin/ship/ship.module';
import { ValueModule } from './admin/value/value.module';
import { TrendModule } from './admin/trend/trend.module';
import { ContactModule } from './admin/contact/contact.module';
import { SliderModule } from './admin/slider/slider.module';
import { ProductModule } from './admin/product/product.module';
import { CategoryModule } from './admin/category/category.module';
import { ValueProductModule } from './admin/value-product/value-product.module';
import { CategoryProductModule } from './admin/category-product/category-product.module';
import { ImageProductModule } from './admin/image-product/image-product.module';
import { VariantModule } from './admin/variant/variant.module';
import { VariantValueModule } from './admin/variant-value/variant-value.module';
import { HomeModule } from './client/home/home.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './client/cart/cart.module';
import { SaleModule } from './admin/sale/sale.module';
import { CheckoutModule } from './client/checkout/checkout.module';
import { OrderModule } from './admin/order/order.module';
import { OrderDetailModule } from './admin/order-detail/order-detail.module';
import { CustomerModule } from './admin/customer/customer.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({}),
    BrandModule,
    MongooseModule.forRoot(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    AttributeModule,
    PaymentModule,
    ShipModule,
    ValueModule,
    TrendModule,
    ContactModule,
    SliderModule,
    ProductModule,
    CategoryModule,
    ValueProductModule,
    CategoryProductModule,
    ImageProductModule,
    VariantModule,
    VariantValueModule,
    HomeModule,
    CartModule,
    SaleModule,
    CheckoutModule,
    OrderModule,
    OrderDetailModule,
    CustomerModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
