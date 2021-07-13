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
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { UpdateCustomerDto } from '../customer/dto/update-customer.dto';
import { UpdateOrderDto } from '../order/dto/update-order.dto';
import { OrderService } from '../order/order.service';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('bill')
@UsePipes(new ValidationPipe())
export class BillController {
  constructor(
    private readonly billService: BillService,
    private orderService: OrderService
  ) {}

  @Get()
  @Render('admin/partials/bill/read-bill')
  async findAll() {
    const allBill = await this.billService.findAll();
    return { title: 'HÓA ĐƠN', pageName: 'DANH SÁCH HÓA ĐƠN', allBill };
  }

  // @Post()
  // create(@Body() createBillDto: CreateBillDto) {
  //   return this.billService.create(createBillDto);
  // }

  @Get(':id')
  @Render('admin/partials/bill/read-bill-detail')
  async findOne(@Param('id') id: string) {
    const findDetail = await this.orderService.findDetail(id);
    return {
      title: 'CHI TIẾT HÓA ĐƠN',
      pageName: 'DANH SÁCH CHI TIẾT',
      findDetail
    };
  }

  @Post('status/:id')
  @Redirect('back')
  async updateStatus(
    @Param('id') id: string,
    @Body() UpdateOrderDto: UpdateOrderDto
  ) {
    return this.orderService.toggle(id, UpdateOrderDto);
  }

  @Get('update/:id')
  @Render('admin/partials/bill/update-bill')
  async getUpdate(@Param('id') id: string) {
    const findOrder = await this.orderService.findOrder(id);
    const findShip = await this.orderService.findShip();
    return {
      title: 'SỬA HÓA ĐƠN',
      pageName: 'SỬA HÓA ĐƠN',
      findOrder,
      findShip
    };
  }

  @Post('update/:id')
  @Redirect('/bill')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Body() UpdateCustomerDto: UpdateCustomerDto
  ) {
    return this.orderService.update(id, updateOrderDto, UpdateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(+id);
  }
}
