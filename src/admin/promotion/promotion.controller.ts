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
  Res,
} from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { ProductService } from '../product/product.service';

@Controller('promotion')
export class PromotionController {
  constructor(
    private readonly promotionService: PromotionService,
    private productService: ProductService,
  ) {}

  @Get('create')
  @Render('admin/partials/promotion/create')
  async getCreate() {
    const products = await this.promotionService.listProduct();
    return { pageName: 'Thêm CTKM', products, title: 'CTKM' };
  }

  @Post('create')
  @Redirect('/promotion')
  async create(
    @Body() createPromotionDto: CreatePromotionDto,
    @Res() res: any,
  ) {
    return await this.promotionService.create(createPromotionDto, res);
  }

  @Get('')
  @Render('admin/partials/promotion/read')
  async findAll() {
    const list = await this.promotionService.findAll();
    return { pageName: 'Danh sách CTKM', list, title: 'CTKM' };
  }

  @Get('update/:id')
  @Render('admin/partials/promotion/update')
  async findOne(@Param('id') id: string) {
    const products = await this.promotionService.listProductUpdate(id);
    const getUpdate = await this.promotionService.findOne(id);
    return {
      pageName: 'Sửa CTKM',
      getUpdate,
      products,
      title: 'CTKM',
    };
  }

  @Post('update/:id')
  @Redirect('back')
  async postUpdate(
    @Param('id') id: string,
    @Body() UpdatePromotionDto: UpdatePromotionDto,
    @Res() res: any,
  ) {
    console.log(UpdatePromotionDto);

    return await this.promotionService.postUpdate(id, UpdatePromotionDto, res);
  }

  @Get('detail/:id')
  @Render('admin/partials/promotion/detail')
  async detail(@Param('id') id: string) {
    const detail = await this.promotionService.detail(id);
    return { pageName: 'Chi tiết CTKM', detail, title: 'CTKM' };
  }

  @Get('delete/:id')
  @Redirect('back')
  async deletePromotion(@Param('id') id: string) {
    return await this.promotionService.remove(id);
  }
}
