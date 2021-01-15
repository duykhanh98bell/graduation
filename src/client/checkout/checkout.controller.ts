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
import { CreateOrderDto } from 'src/admin/order/dto/create-order.dto';
import { HomeService } from '../home/home.service';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly homeService: HomeService,
  ) {}

  @Get('')
  @Render('client/partials/checkout/')
  async getCheckout() {
    const nav = await this.homeService.findNav();
    return { title: 'CHECKOUT', nav };
  }

  @Post('/order')
  async order(@Body() CreateOrderDto: CreateOrderDto, @Req() req, @Res() res) {
    return;
  }
}
