import * as mongoose from 'mongoose';
import { Attribute } from 'src/admin/attribute/entities/attribute.entity';

export class CreateValueDto {
  value: string;
  attribute_id: Attribute;
  createdAt: Date;
  updatedAt: Date;
}
