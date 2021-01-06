import { Module } from '@nestjs/common';
import { TrendService } from './trend.service';
import { TrendController } from './trend.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trend, TrendSchema } from './entities/trend.entity';

@Module({
  controllers: [TrendController],
  providers: [TrendService],
  imports: [
    MongooseModule.forFeature([{ name: Trend.name, schema: TrendSchema }]),
  ],
})
export class TrendModule {}
