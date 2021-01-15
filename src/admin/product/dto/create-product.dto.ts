import { Brand } from 'src/admin/brand/schemas/brand.schema';
import { Category } from 'src/admin/category/entities/category.entity';
import { Trend } from 'src/admin/trend/entities/trend.entity';
import { Value } from 'src/admin/value/entities/value.entity';

export class CreateProductDto {
  name: string;
  product_slug: string;
  product_code: string;
  price: number;
  description: string;
  detail: string;
  brand_id: Brand;
  trend_id: Trend;
  image: string;
  highlight: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  value: Value[];
  category: Category[];
}
