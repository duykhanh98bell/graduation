import { Global, Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { SliderSchema } from 'src/slider/entities/slider.entity';
import { CategorySchema } from 'src/category/entities/category.entity';
import { CategoryProductSchema } from 'src/category-product/entities/category-product.entity';
import { ValueProductSchema } from 'src/value-product/entities/value-product.entity';
import { AttributeSchema } from 'src/attribute/entities/attribute.entity';
import { ImageProductSchema } from 'src/image-product/entities/image-product.entity';
import { ValueSchema } from 'src/value/entities/value.entity';
import { VariantSchema } from 'src/variant/entities/variant.entity';
import { VariantValueSchema } from 'src/variant-value/entities/variant-value.entity';
@Global()
@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Slider', schema: SliderSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
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
  ],
  exports: [HomeService],
})
export class HomeModule {}
