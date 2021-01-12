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
    const [nav, all] = await Promise.all([
      this.homeService.findNav(),
      this.homeService.findAll(),
    ]);
    return { nav, all, title: 'Trang chủ' };
  }

  @Get('collection/:cate')
  @Render('client/partials/collection')
  async filter(@Param('cate') slug: string) {
    const [nav, all, filter] = await Promise.all([
      this.homeService.findNav(),
      this.homeService.findAll(),
      this.homeService.filterCate(slug),
    ]);
    return { nav, all, filter, title: filter.title };
  }

  @Get('product/:slug')
  @Render('client/partials/detail')
  async detail(@Param('slug') slug: string) {
    const [nav, all, detail] = await Promise.all([
      this.homeService.findNav(),
      this.homeService.findDetail(slug),
      this.homeService.detail(slug),
    ]);
    return { nav, all, title: 'CHI TIẾT SẢN PHẨM', detail };
  }
}
