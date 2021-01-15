import { PartialType } from '@nestjs/mapped-types';
import { CreateVariantValueDto } from './create-variant-value.dto';

export class UpdateVariantValueDto extends PartialType(CreateVariantValueDto) {}
