import { PartialType } from '@nestjs/mapped-types';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  name: string;

  parent_id: Category;

  cate_slug: string;

  avatar: string;

  nav_active: boolean;
}
