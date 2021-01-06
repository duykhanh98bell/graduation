import { Brand } from 'src/brand/schemas/brand.schema';
import { Category } from 'src/category/entities/category.entity';
import { Trend } from 'src/trend/entities/trend.entity';
import { Value } from 'src/value/entities/value.entity';

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
