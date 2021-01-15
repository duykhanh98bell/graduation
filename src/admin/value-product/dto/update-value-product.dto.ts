import { PartialType } from '@nestjs/mapped-types';
import { Product } from 'src/admin/product/entities/product.entity';
import { Value } from 'src/admin/value/entities/value.entity';
import { CreateValueProductDto } from './create-value-product.dto';

export class UpdateValueProductDto extends PartialType(CreateValueProductDto) {
  value_id: Value;

  product_id: Product;

  updatedAt: Date;
}
