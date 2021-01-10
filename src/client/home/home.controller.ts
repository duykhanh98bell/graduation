import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';

@Controller('')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @Render('client/partials/index')
  async home() {
    const all = await this.homeService.findAll();
    return { all, title: 'Trang chủ' };
  }

  @Get('collection/:cate')
  @Render('client/partials/collection')
  async filter(@Param('cate') slug: string) {
    const [all, filter] = await Promise.all([
      this.homeService.findAll(),
      this.homeService.filterCate(slug),
    ]);
    return { all, filter, title: filter.title };
  }

  @Get('product/:slug')
  @Render('client/partials/detail')
  async detail(@Param('slug') slug: string) {
    const [all, detail] = await Promise.all([
      this.homeService.findDetail(slug),
      this.homeService.detail(slug),
    ]);
    return { all, title: 'CHI TIẾT SẢN PHẨM', detail };
  }
}
