import { IsDate, IsNumber, IsString } from 'class-validator';
import { Product } from 'src/admin/product/entities/product.entity';

export class CreatePromotionDto {
  @IsString()
  name: string;

  @IsString()
  percent: number;

  product_id: string[];

  start_date: Date;

  end_date: Date;
}
