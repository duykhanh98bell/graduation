import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { Trend, TrendSchema } from 'src/trend/entities/trend.entity';
import { Brand, BrandSchema } from 'src/brand/schemas/brand.schema';
import {
  Category,
  CategorySchema,
} from 'src/category/entities/category.entity';
import { Value, ValueSchema } from 'src/value/entities/value.entity';
import {
  Attribute,
  AttributeSchema,
} from 'src/attribute/entities/attribute.entity';
import {
  ValueProduct,
  ValueProductSchema,
} from 'src/value-product/entities/value-product.entity';
import { CategoryProductSchema } from 'src/category-product/entities/category-product.entity';
import { ImageProductSchema } from 'src/image-product/entities/image-product.entity';
import { VariantSchema } from 'src/variant/entities/variant.entity';
import { VariantValueSchema } from 'src/variant-value/entities/variant-value.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
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
export class ProductModule {}
