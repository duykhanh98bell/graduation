import { Global, Module } from '@nestjs/common';
import { CategoryProductService } from './category-product.service';
import { CategoryProductController } from './category-product.controller';

@Global()
@Module({
  controllers: [CategoryProductController],
  providers: [CategoryProductService],
})
export class CategoryProductModule {}
