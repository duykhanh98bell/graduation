import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  Render,
  Redirect,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TrendService } from './trend.service';
import { CreateTrendDto } from './dto/create-trend.dto';
import { UpdateTrendDto } from './dto/update-trend.dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import multer = require('multer');

// export const storage = {
//   storage: diskStorage({
//     destination: './public/uploads/trend',
//     filename: (req, file, cb) => {
//       const filename: string =
//         path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
//       const extension: string = path.parse(file.originalname).ext;

//       cb(null, `${filename}${extension}`);
//     },
//   }),
// };
export const storage = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/trend');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension: string = path.parse(file.originalname).ext;
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
  }),
};

@Controller('trend')
export class TrendController {
  constructor(private readonly trendService: TrendService) {}

  @Get('create')
  @Render('admin/partials/trend/create')
  getCreate() {
    return { message: 'Them xu huong', title: 'Xu hướng' };
  }

  @Post('create')
  @Redirect('/trend/')
  @UseInterceptors(FileInterceptor('avatar', storage))
  async create(
    @Res() res,
    @Body() createTrendDto: CreateTrendDto,
    @UploadedFile() file,
  ) {
    await this.trendService.create(createTrendDto, file);
    return {
      message: 'Them thanh cong',
    };
  }

  @Get('/')
  @Render('admin/partials/trend/read')
  async findAll() {
    const getAll = await this.trendService.findAll();
    return {
      message: 'Danh sach Xu huong',
      trends: getAll,
      title: 'Xu hướng',
    };
  }

  @Get('update/:id')
  @Render('admin/partials/trend/update')
  async findOne(@Param('id') id: string) {
    const getOne = await this.trendService.findOne(id);
    return { getOne, message: 'Cap nhat xu huong', title: 'Xu hướng' };
  }

  @Post('update/:id')
  @Redirect('/trend/')
  @UseInterceptors(FileInterceptor('avatar', storage))
  update(
    @Res() res,
    @Param('id') id: string,
    @Body() updateTrendDto: UpdateTrendDto,
    @UploadedFile() file,
  ) {
    return {
      message: 'cap nhat thanh cong',
      Trend: this.trendService.update(id, updateTrendDto, file),
    };
  }

  @Get('delete/:id')
  @Redirect('/read')
  remove(@Res() res, @Param('id') id: string) {
    this.trendService.remove(id);
    return res.json({
      message: 'Xoa thanh cong',
    });
  }

  @Get('active/:id')
  @Redirect('/trend/')
  toggleActive(@Param('id') id: string) {
    return this.trendService.toggle(id);
  }

  @Get('nav_active/:id')
  @Redirect('/trend')
  toggleNavActive(@Param('id') id: string) {
    return this.trendService.toggleNav(id);
  }
}
