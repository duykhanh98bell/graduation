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
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('/check')
  check() {
    return;
  }

  @Get('')
  @Render('client/partials/checkout/')
  async getCheckout() {
    const all = await this.checkoutService.findAll();
    return { title: 'CHECKOUT', all };
  }

  @Post('/order')
  async order(@Body() CreateOrderDto: CreateOrderDto, @Req() req, @Res() res) {
    return;
  }
}
