import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { VariantValueService } from './variant-value.service';
import { CreateVariantValueDto } from './dto/create-variant-value.dto';
import { UpdateVariantValueDto } from './dto/update-variant-value.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ViewAuthFilter } from '../http-exception/http-exception.filter';

@UseGuards(JwtAuthGuard)
@UseFilters(ViewAuthFilter)
@Controller('variant-value')
export class VariantValueController {
  constructor(private readonly variantValueService: VariantValueService) {}

  @Post()
  create(@Body() createVariantValueDto: CreateVariantValueDto) {
    return this.variantValueService.create(createVariantValueDto);
  }

  @Get()
  findAll() {
    return this.variantValueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantValueService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateVariantValueDto: UpdateVariantValueDto,
  ) {
    return this.variantValueService.update(+id, updateVariantValueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantValueService.remove(+id);
  }
}
