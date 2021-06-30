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
} from '@nestjs/common';
import { ProductBackService } from './product-back.service';
import { CreateProductBackDto } from './dto/create-product-back.dto';
import { UpdateProductBackDto } from './dto/update-product-back.dto';
import { OrderService } from '../order/order.service';
import { UpdateOrderDto } from '../order/dto/update-order.dto';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { UpdateOrderDetailDto } from '../order-detail/dto/update-order-detail.dto';

@Controller('product-back')
export class ProductBackController {
  constructor(
    private readonly productBackService: ProductBackService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
  ) {}

  // @Post()
  // create(@Body() createProductBackDto: CreateProductBackDto) {
  //   return this.productBackService.create(createProductBackDto);
  // }

  @Get()
  @Render('admin/partials/product-back/read')
  async findAll() {
    const billFail = await this.productBackService.billFail();
    const findDetail = await this.productBackService.findDetail();

    return {
      title: 'SẢN PHẨM LỖI',
      pageName: 'DANH SÁCH SẢN PHẨM LỖI',
      billFail,
      findDetail,
    };
  }

  @Post('status/:id')
  @Redirect('back')
  async toggleStatus(@Param('id') id: string) {
    return await this.orderDetailService.toggle(id);
  }

  @Post('repair/:id')
  @Redirect('back')
  async toggleRepair(
    @Param('id') id: string,
    @Body() UpdateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    return await this.productBackService.repair(id, UpdateOrderDetailDto);
  }

  @Post('UpdateQuantityError/:id')
  @Redirect('back')
  async UpdateQuantityError(
    @Param('id') id: string,
    @Body() UpdateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    return await this.productBackService.UpdateQuantityError(
      id,
      UpdateOrderDetailDto,
    );
  }

  // @Get(':id')
  // @Render('admin/partials/product-back/detail')
  // async findDetail(@Param('id') id: string) {
  //   const findDetail = await this.productBackService.findDetail(id);
  //   return {
  //     title: 'CHI TIẾT SẢN PHẨM LỖI',
  //     pageName: 'DANH SÁCH CHI TIẾT',
  //     findDetail,
  //   };
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productBackService.findOne(+id);
  // }

  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateProductBackDto: UpdateProductBackDto,
  // ) {
  //   return this.productBackService.update(+id, updateProductBackDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productBackService.remove(+id);
  // }
}
