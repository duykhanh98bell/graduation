import { Global, Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import {
  Product,
  ProductSchema,
} from 'src/admin/product/entities/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { SliderSchema } from 'src/admin/slider/entities/slider.entity';
import { CategorySchema } from 'src/admin/category/entities/category.entity';
import { CategoryProductSchema } from 'src/admin/category-product/entities/category-product.entity';
import { ValueProductSchema } from 'src/admin/value-product/entities/value-product.entity';
import { AttributeSchema } from 'src/admin/attribute/entities/attribute.entity';
import { ImageProductSchema } from 'src/admin/image-product/entities/image-product.entity';
import { ValueSchema } from 'src/admin/value/entities/value.entity';
import { VariantSchema } from 'src/admin/variant/entities/variant.entity';
import { VariantValueSchema } from 'src/admin/variant-value/entities/variant-value.entity';
import { PolicySchema } from 'src/admin/policy/entities/policy.entity';
import {
  OrderDetail,
  OrderDetailSchema,
} from 'src/admin/order-detail/entities/order-detail.entity';
import { BrandSchema } from 'src/admin/brand/schemas/brand.schema';
@Global()
@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Slider', schema: SliderSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: 'Brand', schema: BrandSchema }]),
    MongooseModule.forFeature([
      { name: 'CategoryProduct', schema: CategoryProductSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Value', schema: ValueSchema }]),
    MongooseModule.forFeature([{ name: 'Attribute', schema: AttributeSchema }]),
    MongooseModule.forFeature([{ name: 'Image', schema: ImageProductSchema }]),
    MongooseModule.forFeature([{ name: 'Variant', schema: VariantSchema }]),
    MongooseModule.forFeature([
      { name: 'VariantValue', schema: VariantValueSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'ValueProduct', schema: ValueProductSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Policy', schema: PolicySchema }]),
    MongooseModule.forFeature([
      { name: OrderDetail.name, schema: OrderDetailSchema },
    ]),
  ],
  exports: [HomeService],
})
export class HomeModule {}
