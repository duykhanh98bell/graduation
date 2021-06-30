import { Global, Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Promotion, PromotionSchema } from './entities/promotion.entity';
import { Product, ProductSchema } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { Brand, BrandSchema } from '../brand/schemas/brand.schema';
import { Trend, TrendSchema } from '../trend/entities/trend.entity';
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

@Global()
@Module({
  controllers: [PromotionController],
  providers: [PromotionService, ProductService],
  imports: [
    MongooseModule.forFeature([
      { name: Promotion.name, schema: PromotionSchema },
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
export class PromotionModule {}
