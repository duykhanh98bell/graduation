import {
  Equals,
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Brand } from 'src/admin/brand/schemas/brand.schema';
import { Category } from 'src/admin/category/entities/category.entity';
// import { Trend } from 'src/admin/trend/entities/trend.entity';
import { Value } from 'src/admin/value/entities/value.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  name: string;

  product_slug: string;

  @IsString()
  @IsNotEmpty({ message: 'Mã sản phẩm không được để trống' })
  product_code: string;

  @IsNotEmpty({ message: 'Giá nhập sản phẩm không được để trống' })
  price_in: number;

  @IsNotEmpty({ message: 'Giá cũ không được để trống' })
  price_old: number;

  @IsNotEmpty({ message: 'Giá bán sản phẩm không được để trống' })
  price: number;

  description: string;

  detail: string;

  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  @IsString()
  brand_id: Brand;

  image: string;

  highlight: boolean;

  @IsArray()
  value: Value[];

  @IsArray()
  category: Category[];
}
