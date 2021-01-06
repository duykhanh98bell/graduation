import { Product } from 'src/product/entities/product.entity';
import { Value } from 'src/value/entities/value.entity';

export class CreateVariantDto {
  quantity: number;
  product_id: Product;
  value_id: Value[];
}
