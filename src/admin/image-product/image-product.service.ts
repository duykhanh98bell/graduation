import { Injectable } from '@nestjs/common';
import { CreateImageProductDto } from './dto/create-image-product.dto';
import { UpdateImageProductDto } from './dto/update-image-product.dto';

@Injectable()
export class ImageProductService {
  create(createImageProductDto: CreateImageProductDto) {
    return 'This action adds a new imageProduct';
  }

  findAll() {
    return `This action returns all imageProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageProduct`;
  }

  update(id: number, updateImageProductDto: UpdateImageProductDto) {
    return `This action updates a #${id} imageProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} imageProduct`;
  }
}
