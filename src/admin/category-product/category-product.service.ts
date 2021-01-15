import { Injectable } from '@nestjs/common';
import { CreateCategoryProductDto } from './dto/create-category-product.dto';
import { UpdateCategoryProductDto } from './dto/update-category-product.dto';

@Injectable()
export class CategoryProductService {
  create(createCategoryProductDto: CreateCategoryProductDto) {
    return 'This action adds a new categoryProduct';
  }

  findAll() {
    return `This action returns all categoryProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryProduct`;
  }

  update(id: number, updateCategoryProductDto: UpdateCategoryProductDto) {
    return `This action updates a #${id} categoryProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryProduct`;
  }
}
