import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { CreateCustomerDto } from 'src/admin/customer/dto/create-customer.dto';
import { CreateOrderDetailDto } from 'src/admin/order-detail/dto/create-order-detail.dto';
import { CreateOrderDto } from 'src/admin/order/dto/create-order.dto';
import { PaymentService } from 'src/admin/payment/payment.service';
import { HomeService } from '../home/home.service';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly homeService: HomeService,
    private readonly PaymentService: PaymentService,
  ) {}

  @Get('')
  @Render('client/partials/checkout/')
  async getCheckout() {
    const nav = await this.homeService.findNav();
    const payments = await this.PaymentService.findAll();
    return { title: 'CHECKOUT', nav, payments };
  }

  @Post('/order')
  async order(
    @Body() CreateOrderDto: CreateOrderDto,
    @Body() CreateCustomerDto: CreateCustomerDto,
    @Body() CreateOrderDetailDto: CreateOrderDetailDto,
    @Req() req: any,
    @Res() res: any,
  ) {
    return await this.checkoutService.order(
      CreateOrderDto,
      CreateCustomerDto,
      CreateOrderDetailDto,
      req,
      res,
    );
  }
}
