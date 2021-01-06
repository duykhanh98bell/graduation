import { Category } from '../entities/category.entity';

export class CreateCategoryDto {
  name: string;

  parent_id: Category;

  cate_slug: string;

  avatar: string;

  nav_active: boolean;
}
