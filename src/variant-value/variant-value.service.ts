import { Injectable } from '@nestjs/common';
import { CreateVariantValueDto } from './dto/create-variant-value.dto';
import { UpdateVariantValueDto } from './dto/update-variant-value.dto';

@Injectable()
export class VariantValueService {
  create(createVariantValueDto: CreateVariantValueDto) {
    return 'This action adds a new variantValue';
  }

  findAll() {
    return `This action returns all variantValue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variantValue`;
  }

  update(id: number, updateVariantValueDto: UpdateVariantValueDto) {
    return `This action updates a #${id} variantValue`;
  }

  remove(id: number) {
    return `This action removes a #${id} variantValue`;
  }
}
