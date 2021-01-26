import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ValueProductService } from './value-product.service';
import { CreateValueProductDto } from './dto/create-value-product.dto';
import { UpdateValueProductDto } from './dto/update-value-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('value-product')
export class ValueProductController {
  constructor(private readonly valueProductService: ValueProductService) {}

  @Post()
  create(@Body() createValueProductDto: CreateValueProductDto) {
    return this.valueProductService.create(createValueProductDto);
  }

  @Get()
  findAll() {
    return this.valueProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.valueProductService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateValueProductDto: UpdateValueProductDto,
  ) {
    return this.valueProductService.update(+id, updateValueProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.valueProductService.remove(+id);
  }
}
