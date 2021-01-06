import { Injectable } from '@nestjs/common';
import { CreateValueProductDto } from './dto/create-value-product.dto';
import { UpdateValueProductDto } from './dto/update-value-product.dto';

@Injectable()
export class ValueProductService {
  create(createValueProductDto: CreateValueProductDto) {
    return 'This action adds a new valueProduct';
  }

  findAll() {
    return `This action returns all valueProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} valueProduct`;
  }

  update(id: number, updateValueProductDto: UpdateValueProductDto) {
    return `This action updates a #${id} valueProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} valueProduct`;
  }
}
