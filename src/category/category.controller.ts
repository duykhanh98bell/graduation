import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Render,
  UseInterceptors,
  UploadedFile,
  Redirect,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer = require('multer');
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import path = require('path');

export const storage = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/category');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension: string = path.parse(file.originalname).ext;

      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
  }),
};

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('create')
  @Render('admin/partials/category/create')
  async getCreate() {
    const categories = await this.categoryService.findAll();
    return { message: 'Thêm mới danh mục', categories, title: 'Danh mục' };
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('avatar', storage))
  @Redirect('/category')
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req,
    @UploadedFile() file,
  ) {
    return this.categoryService.create(createCategoryDto, req, file);
  }

  @Get()
  @Render('admin/partials/category/read')
  async findAll() {
    const categoryAndParent = await Promise.all([
      this.categoryService.findAll(),
      this.categoryService.findParent(),
    ]).then(([categories, parents]) => {
      return { categories, parents };
    });
    return {
      message: 'Danh sách danh mục',
      categoryAndParent,
      title: 'Danh mục',
    };
  }

  @Get('nav_active/:id')
  @Redirect('/category')
  async toggleNavActive(@Param('id') id: string) {
    return await this.categoryService.toggleNav(id);
  }

  @Get('update/:id')
  @Render('admin/partials/category/update')
  async findOne(@Param('id') id: string) {
    const category = await Promise.all([
      this.categoryService.findOne(id),
      this.categoryService.findParent(),
    ]).then(([categoryEdit, categoryParents]) => {
      return { categoryEdit, categoryParents };
    });
    return { message: 'Cập nhật danh mục', category, title: 'Danh mục' };
  }

  @Post('update/:id')
  @UseInterceptors(FileInterceptor('avatar', storage))
  @Redirect('/category')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file,
    @Req() req,
  ) {
    return this.categoryService.update(id, updateCategoryDto, file, req);
  }

  @Get('delete/:id')
  @Redirect('/category')
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(id);
  }
}
