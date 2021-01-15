import { Module } from '@nestjs/common';
import { ValueProductService } from './value-product.service';
import { ValueProductController } from './value-product.controller';

@Module({
  controllers: [ValueProductController],
  providers: [ValueProductService]
})
export class ValueProductModule {}
