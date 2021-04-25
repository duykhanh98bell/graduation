import { PartialType } from '@nestjs/mapped-types';
import { CreateValueDto } from './create-value.dto';
import * as mongoose from 'mongoose';
import { Attribute } from 'src/admin/attribute/entities/attribute.entity';
import { IsNotEmpty } from 'class-validator';

export class UpdateValueDto extends PartialType(CreateValueDto) {
  @IsNotEmpty({ message: 'Tên giá trị không được trống' })
  value: string;

  @IsNotEmpty()
  attribute_id: Attribute;

  updatedAt: Date;
}
