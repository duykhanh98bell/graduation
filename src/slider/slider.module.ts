import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderController } from './slider.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Slider, SliderSchema } from './entities/slider.entity';

@Module({
  controllers: [SliderController],
  providers: [SliderService],
  imports: [
    MongooseModule.forFeature([{ name: Slider.name, schema: SliderSchema }]),
  ],
})
export class SliderModule {}
