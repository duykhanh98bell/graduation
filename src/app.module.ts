import { Global, Module } from '@nestjs/common';
import { BrandModule } from './brand/brand.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogCategoryService } from './blog-category/blog-category.service';
import { BlogCategoryModule } from './blog-category/blog-category.module';
import { AttributeModule } from './attribute/attribute.module';
import { PaymentModule } from './payment/payment.module';
import { ShipModule } from './ship/ship.module';
import { ValueModule } from './value/value.module';
import { TrendModule } from './trend/trend.module';
import { ContactModule } from './contact/contact.module';
import { SliderModule } from './slider/slider.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ValueProductModule } from './value-product/value-product.module';
import { CategoryProductModule } from './category-product/category-product.module';
import { ImageProductModule } from './image-product/image-product.module';
import { VariantModule } from './variant/variant.module';
import { VariantValueModule } from './variant-value/variant-value.module';
import { HomeModule } from './client/home/home.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './client/cart/cart.module';
import { SaleModule } from './sale/sale.module';
import { CheckoutModule } from './client/checkout/checkout.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { CustomerModule } from './customer/customer.module';

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
    BlogCategoryModule,
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
  providers: [BlogCategoryService],
  controllers: [],
})
export class AppModule {}
