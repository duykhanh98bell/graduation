import { PartialType } from '@nestjs/mapped-types';
import { CreateImageProductDto } from './create-image-product.dto';

export class UpdateImageProductDto extends PartialType(CreateImageProductDto) {}
