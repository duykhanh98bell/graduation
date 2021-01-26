import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Render,
  Redirect,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ValueService } from './value.service';
import { CreateValueDto } from './dto/create-value.dto';
import { UpdateValueDto } from './dto/update-value.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('value')
export class ValueController {
  constructor(private readonly valueService: ValueService) {}

  @Get('/create')
  @Render('admin/partials/value/create')
  async getCreate() {
    const attributes = await this.valueService.getAttribute();
    return { pageName: 'Thêm mới giá trị', attributes, title: 'Giá trị' };
  }

  @Post('/create')
  @Redirect('/value/')
  create(@Body() createValueDto: CreateValueDto) {
    return this.valueService.create(createValueDto);
  }

  @Get('')
  @Render('admin/partials/value/read')
  async findAll() {
    const values = (await this.valueService.findAll()).values;
    const attributes = await this.valueService.getAttribute();
    return {
      pageName: 'Hiển thị danh sách giá trị',
      values,
      attributes,
      title: 'Giá trị',
    };
  }

  @Get('/update/:id')
  @Render('admin/partials/value/update')
  async findOne(@Param('id') id: string) {
    const value = await this.valueService.findOne(id);
    const attributes = await this.valueService.getAttribute();
    return {
      pageName: 'Chỉnh sửa giá trị',
      value,
      attributes,
      title: 'Giá trị',
    };
  }

  @Post('/update/:id')
  @Redirect('/value/')
  update(@Param('id') id: string, @Body() updateValueDto: UpdateValueDto) {
    return this.valueService.update(id, updateValueDto);
  }

  @Get('/delete/:id')
  @Redirect('/value/')
  remove(@Param('id') id: string) {
    return this.valueService.remove(id);
  }
}
