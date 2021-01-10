import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  Res,
  Render,
  Redirect,
} from '@nestjs/common';
import { CreateSaleDto } from 'src/sale/dto/create-sale.dto';
import { HomeService } from '../home/home.service';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/')
  addCart(@Req() req, @Res() res, @Body() CreateCartDto: CreateCartDto) {
    return this.cartService.addNewCart(req, res, CreateCartDto);
  }

  @Get('/')
  @Render('client/partials/cart')
  async listCart(@Req() req) {
    const all = await this.cartService.findAll();
    return { title: 'GIỎ HÀNG', products: req.session.cart, all };
  }

  @Get('/delete/:id')
  async deleteItem(@Param('id') id: string, @Req() req, @Res() res) {
    return await this.cartService.deleteItem(id, req, res);
  }

  @Post('/minus')
  async minusQuantity(@Req() req, @Res() res) {
    return await this.cartService.minus(req, res);
  }

  @Post('/plus')
  async plusQuantity(@Req() req, @Res() res) {
    return await this.cartService.plus(req, res);
  }

  @Post('/quantity')
  async upQuantity(@Req() req, @Res() res) {
    return await this.cartService.quantity(req, res);
  }

  @Post('/apply')
  async applySale(
    @Req() req,
    @Res() res,
    @Body() CreateSaleDto: CreateSaleDto,
  ) {
    return await this.cartService.applySale(req, res, CreateSaleDto);
  }

  @Post('warehouse')
  async warehouse(@Req() req, @Res() res) {
    return await this.cartService.checkWH(req, res);
  }
}
