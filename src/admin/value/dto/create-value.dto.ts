import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';
import { Attribute } from 'src/admin/attribute/entities/attribute.entity';

export class CreateValueDto {
  @IsNotEmpty({ message: 'Tên giá trị không được trống' })
  value: string;

  @IsNotEmpty()
  attribute_id: Attribute;

  code: string;
}
