import { Module } from '@nestjs/common';
import { ShipService } from './ship.service';
import { ShipController } from './ship.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ship, ShipSchema } from './entities/ship.entity';

@Module({
  controllers: [ShipController],
  providers: [ShipService],
  imports: [MongooseModule.forFeature([{ name: 'Ship', schema: ShipSchema }])],
})
export class ShipModule {}
