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
  UseGuards,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get('/create')
  @Render('admin/partials/sale/create')
  async getCreate() {
    return { title: 'Khuyến mãi', pageName: 'Thêm mới khuyến mãi' };
  }

  @Post('/create')
  @Redirect('/sale')
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  @Render('admin/partials/sale/read')
  async findAll() {
    const getSale = await this.saleService.findAll();
    return {
      title: 'Khuyến mãi',
      pageName: 'Danh sách khuyến mãi',
      getSale,
    };
  }

  @Get('update/:id')
  @Render('admin/partials/sale/update')
  async findOne(@Param('id') id: string) {
    const Sale = await this.saleService.findOne(id);
    return {
      title: 'Khuyến mãi',
      pageName: 'Cập nhật khuyến mãi',
      Sale,
    };
  }

  @Post('update/:id')
  @Redirect('/sale')
  async update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return await this.saleService.update(id, updateSaleDto);
  }

  @Get('delete/:id')
  @Redirect('/sale')
  async remove(@Param('id') id: string) {
    return await this.saleService.remove(id);
  }
}
