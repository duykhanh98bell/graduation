import { Module } from '@nestjs/common';
import { VariantValueService } from './variant-value.service';
import { VariantValueController } from './variant-value.controller';

@Module({
  controllers: [VariantValueController],
  providers: [VariantValueService]
})
export class VariantValueModule {}
