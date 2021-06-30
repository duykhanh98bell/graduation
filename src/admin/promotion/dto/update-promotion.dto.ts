import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { Product } from 'src/admin/product/entities/product.entity';
import { CreatePromotionDto } from './create-promotion.dto';

export class UpdatePromotionDto extends PartialType(CreatePromotionDto) {
  @IsString()
  name: string;

  @IsString()
  percent: number;

  product_id: string[];

  start_date: Date;

  end_date: Date;
}
