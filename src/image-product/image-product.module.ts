import { Module } from '@nestjs/common';
import { ImageProductService } from './image-product.service';
import { ImageProductController } from './image-product.controller';

@Module({
  controllers: [ImageProductController],
  providers: [ImageProductService]
})
export class ImageProductModule {}
