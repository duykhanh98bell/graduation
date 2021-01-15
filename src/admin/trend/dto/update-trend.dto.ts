import { PartialType } from '@nestjs/mapped-types';
import { CreateTrendDto } from './create-trend.dto';

export class UpdateTrendDto extends PartialType(CreateTrendDto) {
  name: string;
  slug?: string;
  avatar: string;
  active: boolean;
  nav_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
