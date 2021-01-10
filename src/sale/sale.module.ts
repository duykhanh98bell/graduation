import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { Sale, SaleSchema } from './entities/sale.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [SaleController],
  providers: [SaleService],
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
  ],
})
export class SaleModule {}
