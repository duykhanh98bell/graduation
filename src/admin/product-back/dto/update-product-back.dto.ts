import { PartialType } from '@nestjs/mapped-types';
import { CreateProductBackDto } from './create-product-back.dto';

export class UpdateProductBackDto extends PartialType(CreateProductBackDto) {}
