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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @Render('admin/partials/order/read')
  async findAll() {
    const allBill = await this.orderService.findAll();
    return { title: 'HÓA ĐƠN', pageName: 'DANH SÁCH HÓA ĐƠN', allBill };
  }

  @Get(':id')
  @Render('admin/partials/order/read-detail')
  async findDetail(@Param('id') id: string) {
    const findDetail = await this.orderService.findDetail(id);
    return {
      title: 'CHI TIẾT HÓA ĐƠN',
      pageName: 'DANH SÁCH CHI TIẾT',
      findDetail,
    };
  }

  @Post('status/:id')
  @Redirect('back')
  async toggleStatus(@Param('id') id: string) {
    return await this.orderService.toggle(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
