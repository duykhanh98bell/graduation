import { PartialType } from '@nestjs/mapped-types';
import { CreateValueDto } from './create-value.dto';
import * as mongoose from 'mongoose';
import { Attribute } from 'src/attribute/entities/attribute.entity';

export class UpdateValueDto extends PartialType(CreateValueDto) {
  value: string;
  attribute_id: Attribute;
  updatedAt: Date;
}
