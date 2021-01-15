import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import {
  Product,
  ProductSchema,
} from 'src/admin/product/entities/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/admin/category/entities/category.entity';
import { CategoryProductSchema } from 'src/admin/category-product/entities/category-product.entity';
import { VariantSchema } from 'src/admin/variant/entities/variant.entity';
import { VariantValueSchema } from 'src/admin/variant-value/entities/variant-value.entity';
import { Sale, SaleSchema } from 'src/admin/sale/entities/sale.entity';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    MongooseModule.forFeature([
      { name: 'CategoryProduct', schema: CategoryProductSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Variant', schema: VariantSchema }]),
    MongooseModule.forFeature([
      { name: 'VariantValue', schema: VariantValueSchema },
    ]),
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
  ],
  exports: [CartService],
})
export class CartModule {}
