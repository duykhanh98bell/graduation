import { Product } from 'src/admin/product/entities/product.entity';
import { Value } from 'src/admin/value/entities/value.entity';

export class CreateVariantDto {
  quantity: number;
  product_id: Product;
  value_id: Value[];
}
