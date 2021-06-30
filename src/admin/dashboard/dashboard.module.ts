import { Global, Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Promotion,
  PromotionSchema,
} from '../promotion/entities/promotion.entity';
import { Product, ProductSchema } from '../product/entities/product.entity';
import { Trend, TrendSchema } from '../trend/entities/trend.entity';
import { Brand, BrandSchema } from '../brand/schemas/brand.schema';
import { Category, CategorySchema } from '../category/entities/category.entity';
import { ValueSchema } from '../value/entities/value.entity';
import {
  Attribute,
  AttributeSchema,
} from '../attribute/entities/attribute.entity';
import { ValueProductSchema } from '../value-product/entities/value-product.entity';
import { CategoryProductSchema } from '../category-product/entities/category-product.entity';
import { ImageProductSchema } from '../image-product/entities/image-product.entity';
import { VariantSchema } from '../variant/entities/variant.entity';
import { VariantValueSchema } from '../variant-value/entities/variant-value.entity';
import { Order, OrderSchema } from '../order/entities/order.entity';
import {
  OrderDetail,
  OrderDetailSchema,
} from '../order-detail/entities/order-detail.entity';
import { Customer, CustomerSchema } from '../customer/entities/customer.entity';

@Global()
@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
  imports: [
    MongooseModule.forFeature([
      { name: Promotion.name, schema: PromotionSchema },
    ]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([
      { name: OrderDetail.name, schema: OrderDetailSchema },
    ]),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),

    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Trend.name, schema: TrendSchema }]),
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: 'Value', schema: ValueSchema }]),
    MongooseModule.forFeature([
      { name: Attribute.name, schema: AttributeSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'ValueProduct', schema: ValueProductSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'CategoryProduct', schema: CategoryProductSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Image', schema: ImageProductSchema }]),
    MongooseModule.forFeature([{ name: 'Variant', schema: VariantSchema }]),
    MongooseModule.forFeature([
      { name: 'VariantValue', schema: VariantValueSchema },
    ]),
  ],
})
export class DashboardModule {}
