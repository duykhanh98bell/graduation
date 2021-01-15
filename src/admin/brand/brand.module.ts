import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandService } from './brand.service';
import { Brand, BrandSchema } from './schemas/brand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
