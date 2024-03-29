import { Global, Module } from '@nestjs/common';
import { ValueService } from './value.service';
import { ValueController } from './value.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Value, ValueSchema } from './entities/value.entity';
import {
  Attribute,
  AttributeSchema,
} from 'src/admin/attribute/entities/attribute.entity';

@Global()
@Module({
  controllers: [ValueController],
  providers: [ValueService],
  imports: [
    MongooseModule.forFeature([{ name: 'Value', schema: ValueSchema }]),
    MongooseModule.forFeature([
      { name: Attribute.name, schema: AttributeSchema },
    ]),
  ],
})
export class ValueModule {}
