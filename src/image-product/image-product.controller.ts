import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ImageProductService } from './image-product.service';
import { CreateImageProductDto } from './dto/create-image-product.dto';
import { UpdateImageProductDto } from './dto/update-image-product.dto';

@Controller('image-product')
export class ImageProductController {
  constructor(private readonly imageProductService: ImageProductService) {}

  @Post()
  create(@Body() createImageProductDto: CreateImageProductDto) {
    return this.imageProductService.create(createImageProductDto);
  }

  @Get()
  findAll() {
    return this.imageProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageProductService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateImageProductDto: UpdateImageProductDto) {
    return this.imageProductService.update(+id, updateImageProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageProductService.remove(+id);
  }
}
