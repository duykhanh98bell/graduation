import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Redirect,
} from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post()
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailService.create(createOrderDetailDto);
  }

  @Get()
  findAll() {
    return this.orderDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDetailService.findOne(id);
  }

  @Post('status/:id')
  @Redirect('back')
  async toggleStatus(@Param('id') id: string) {
    return await this.orderDetailService.toggle(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    return this.orderDetailService.update(+id, updateOrderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDetailService.remove(+id);
  }
}
