import { Module } from '@nestjs/common';
import { CategoryProductService } from './category-product.service';
import { CategoryProductController } from './category-product.controller';

@Module({
  controllers: [CategoryProductController],
  providers: [CategoryProductService]
})
export class CategoryProductModule {}
