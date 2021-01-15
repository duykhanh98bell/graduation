import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryProductDto } from './create-category-product.dto';

export class UpdateCategoryProductDto extends PartialType(CreateCategoryProductDto) {}
