import { Product } from 'src/product/entities/product.entity';
import { Value } from 'src/value/entities/value.entity';

export class CreateValueProductDto {
  value_id: Value;

  product_id: Product;

  createdAt: Date;

  updatedAt: Date;
}
