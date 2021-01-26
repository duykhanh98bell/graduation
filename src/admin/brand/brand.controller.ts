import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Redirect,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BrandService } from './brand.service';
import { CreateBrandDTO } from './dtos/create-brand.dto';
import { Brand } from './interfaces/brand.interface';

@UseGuards(JwtAuthGuard)
@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get('/create')
  @Render('admin/partials/brand/create')
  getCreateBrand() {
    return { pageName: 'Thêm mới thương hiệu', title: 'Thương hiệu' };
  }

  @Post('/create')
  @Redirect('/brand/')
  async postBrand(
    @Req() req,
    @Res() res,
    @Body() createbrandDTO: CreateBrandDTO,
  ) {
    const brand = await this.brandService.create(createbrandDTO);
    return;
  }

  @Get('')
  @Render('admin/partials/brand/read')
  async getAllBrand() {
    const brands = await this.brandService.findAll();
    return { pageName: 'Danh sách thương hiệu', brands, title: 'Thương hiệu' };
  }

  @Get(':id')
  async getOneBrand(@Param('id') id) {
    const brand = await this.brandService.findOne(id);
    if (!brand) throw new NotFoundException('Khong tim thay thuowng thieu');
    return brand;
  }

  @Get('/update/:id')
  @Render('admin/partials/brand/update')
  async getUpdateBrand(@Param('id') id) {
    const brand = await this.brandService.findOne(id);
    return { brand, pageName: 'Sửa thương hiệu', title: 'Thương hiệu' };
  }

  @Post('/update/:id')
  @Redirect('/brand/')
  async updateBrand(
    @Res() res,
    @Param('id') id,
    @Body() createBrandDTO: CreateBrandDTO,
  ): Promise<Brand> {
    const updateBrand = await this.brandService.updateBrand(id, createBrandDTO);
    return;
  }

  @Get('/delete/:id')
  @Redirect('/brand/')
  async deleteBrand(@Param('id') id, @Res() res) {
    const deleteBrand = await this.brandService.deleteBrand(id);
    return;
  }
}
