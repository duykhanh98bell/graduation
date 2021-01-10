import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from './create-sale.dto';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
  name: string;
  code: string;
  percent: number;
}
