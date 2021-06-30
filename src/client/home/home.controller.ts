import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Render,
  Query,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';

@Controller('')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @Render('client/partials/index')
  async home(@Query() query: any) {
    const [nav, all] = await Promise.all([
      this.homeService.findNav(),
      this.homeService.findAll(query['page']),
    ]);
    return { nav, all, title: 'Trang chủ' };
  }

  @Get('/search')
  @Render('client/partials/index')
  async searched(@Query() query: any) {
    const [nav, all] = await Promise.all([
      this.homeService.findNav(),
      this.homeService.search(query['q']),
    ]);
    return { nav, all, title: 'Search' };
  }

  @Get('collection/:slug')
  @Render('client/partials/collection')
  async filter(@Param() params: string[], @Query() query: any) {
    const [nav, all, filter] = await Promise.all([
      this.homeService.findNav(),
      this.homeService.collection(query['page']),
      this.homeService.filterCate(
        params['slug'],
        query['xx'],
        query['page'],
        query['priceMin'],
        query['priceMax'],
        query['value'],
        query['q'],
      ),
    ]);
    return { nav, all, filter, title: filter.title };
  }

  @Get('detail/:slug')
  @Render('client/partials/detail')
  async detail(@Param('slug') slug: string) {
    const [nav, all, detail] = await Promise.all([
      this.homeService.findNav(),
      this.homeService.findDetail(slug),
      this.homeService.detail(slug),
    ]);
    return { nav, all, title: 'CHI TIẾT SẢN PHẨM', detail };
  }

  @Get('policy-discount')
  @Render('client/partials/policy')
  async policy() {
    const [nav] = await Promise.all([this.homeService.findNav()]);
    const policy = await this.homeService.policy();
    return { nav, policy, title: 'Chính sách' };
  }
}
