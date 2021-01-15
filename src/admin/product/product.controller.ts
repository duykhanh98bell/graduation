/* eslint-disable prettier/prettier */
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
  Redirect,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multer = require('multer');
import path = require('path');
import { CreateImageProductDto } from './dto/create-image-product.dto';
import { CreateVariantDto } from 'src/admin/variant/dto/create-variant.dto';
import { UpdateVariantDto } from 'src/admin/variant/dto/update-variant.dto';

export const storage = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/product/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension: string = path.parse(file.originalname).ext;
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
  }),
};

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('create')
  @Render('admin/partials/product/create')
  async getCreate() {
    const select = await Promise.all([
      this.productService.getBrand(),
      this.productService.getTrend(),
      this.productService.getCategory(),
      this.productService.getValue(),
      this.productService.getAttribute(),
    ]).then(([brands, trends, categories, values, attributes]) => {
      return { brands, trends, categories, values, attributes };
    });
    return { pageName: 'Thêm mới sản phẩm', select, title: 'Sản phẩm' };
  }

  @Post('create')
  @Redirect('/product')
  @UseInterceptors(FileInterceptor('image', storage))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file,
  ) {
    return this.productService.create(createProductDto, file);
  }

  @Get()
  @Render('admin/partials/product/read')
  async findAll() {
    const select = await this.productService.findAll();
    return { pageName: 'Danh sách sản phẩm', select, title: 'Sản phẩm' };
  }

  @Get('update/:id')
  @Render('admin/partials/product/update')
  async findOne(@Param('id') id: string) {
    const select = await this.productService.findOne(id);
    return { pageName: 'Cập nhật sản phẩm', select, title: 'Sản phẩm' };
  }

  @Post('update/:id')
  @UseInterceptors(FileInterceptor('image', storage))
  @Redirect('/product')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file,
  ) {
    return await this.productService.update(id, updateProductDto, file);
  }

  @Get('delete/:id')
  @Redirect('/product')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }

  @Get('image/:id')
  @Render('admin/partials/product/image')
  async getImage(@Param('id') id: string) {
    const images = await this.productService.getImage(id);
    return { pageName: 'Danh sách ảnh', images, title: 'Ảnh sản phẩm' };
  }

  @Post('image/:id')
  @UseInterceptors(FileInterceptor('image', storage))
  async postImage(@Param('id') id: string, @UploadedFile() file, @Res() res) {
    if (file) {
      await this.productService.addImage(id, file);
    }
    return res.redirect('back');
  }

  @Post('image/edit/:id')
  @UseInterceptors(FileInterceptor('image', storage))
  async editImage(@Param('id') id: string, @UploadedFile() file, @Res() res) {
    if (file) {
      await this.productService.editImage(id, file);
    }
    return res.redirect('back');
  }

  @Get('image/delete/:id')
  async removeImage(@Param('id') id: string, @Res() res) {
    await this.productService.removeImage(id);
    return res.redirect('back');
  }

  @Get('variant/:id')
  @Render('admin/partials/product/createVariant')
  async createVariant(@Param('id') id: string) {
    const selectValue = await this.productService.findValue(id);
    return {
      pageName: 'Danh sách biến thể',
      selectValue,
      title: 'Biến thể sản phẩm',
    };
  }

  @Post('variant/:id')
  async postVariant(
    @Param('id') id: string,
    @Body() createVariantDto: CreateVariantDto,
    @Res() res,
  ) {
    await this.productService.createVariant(id, createVariantDto);
    return res.redirect('back');
  }

  @Post('variant/update/:id')
  async editVariant(
    @Body() updateVariantDto: UpdateVariantDto,
    @Param('id') id: string,
    @Res() res,
  ) {
    if (updateVariantDto.quantity) {
      await this.productService.updateQuantity(id, updateVariantDto);
    }
    return res.redirect('back');
  }

  @Get('variant/delete/:id')
  async deleteVariant(@Param('id') id: string, @Res() res) {
    await this.productService.deleteVariant(id);
    return res.redirect('back');
  }
}
