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
  UseFilters
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ViewAuthFilter } from '../http-exception/http-exception.filter';
import { UpdateCustomerDto } from '../customer/dto/update-customer.dto';

@UseGuards(JwtAuthGuard)
@UseFilters(ViewAuthFilter)
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
    return { title: 'ĐƠN HÀNG', pageName: 'DANH SÁCH ĐƠN HÀNG', allBill };
  }

  @Get(':id')
  @Render('admin/partials/order/read-detail')
  async findDetail(@Param('id') id: string) {
    const findDetail = await this.orderService.findDetail(id);
    return {
      title: 'CHI TIẾT ĐƠN HÀNG',
      pageName: 'DANH SÁCH CHI TIẾT',
      findDetail
    };
  }

  @Post('status/:id')
  @Redirect('back')
  async toggleStatus(
    @Param('id') id: string,
    @Body() UpdateOrderDto: UpdateOrderDto
  ) {
    return await this.orderService.toggle(id, UpdateOrderDto);
  }

  @Get('update/:id')
  @Render('admin/partials/order/update')
  async getUpdate(@Param('id') id: string) {
    const findOrder = await this.orderService.findOrder(id);
    const findShip = await this.orderService.findShip();
    return {
      title: 'SỬA ĐƠN HÀNG',
      pageName: 'SỬA ĐƠN HÀNG',
      findOrder,
      findShip
    };
  }

  @Post('update/:id')
  @Redirect('/order')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Body() UpdateCustomerDto: UpdateCustomerDto
  ) {
    return this.orderService.update(id, updateOrderDto, UpdateCustomerDto);
  }

  @Get('delete/:id')
  @Redirect('/order')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }
}
