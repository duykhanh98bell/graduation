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
  UseGuards,
} from '@nestjs/common';
import { SliderService } from './slider.service';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import path = require('path');
import multer = require('multer');
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

export const storage = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/slider');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension: string = path.parse(file.originalname).ext;
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
  }),
};

@UseGuards(JwtAuthGuard)
@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Get('/create')
  @Render('admin/partials/slider/create')
  getCreate() {
    return { pageName: 'them moi slide', title: 'Slider' };
  }

  @Post('/create')
  @Redirect('/slider')
  @UseInterceptors(FileInterceptor('image', storage))
  async create(
    @Res() res,
    @Body() createSliderDto: CreateSliderDto,
    @UploadedFile() file,
  ) {
    await this.sliderService.create(createSliderDto, file);
    return {
      pageName: 'Them thanh cong',
    };
  }

  @Get()
  @Render('admin/partials/slider/read')
  async findAll() {
    const sliders = await this.sliderService.findAll();
    return {
      sliders,
      pageName: 'Danh sách slider',
      title: 'Slider',
    };
  }

  @Get('update/:id')
  @Render('admin/partials/slider/update')
  async findOne(@Param('id') id: string) {
    const slider = await this.sliderService.findOne(id);
    return { slider, pageName: 'Cập nhật slider', title: 'Slider' };
  }

  @Post('update/:id')
  @Redirect('/slider')
  @UseInterceptors(FileInterceptor('image', storage))
  update(
    @Param('id') id: string,
    @Body() updateSliderDto: UpdateSliderDto,
    @UploadedFile() file,
  ) {
    return this.sliderService.update(id, updateSliderDto, file);
  }

  @Get('delete/:id')
  @Redirect('/slider')
  remove(@Param('id') id: string) {
    return this.sliderService.remove(id);
  }

  @Get('active/:id')
  @Redirect('/slider')
  toggleActive(@Param('id') id: string) {
    return this.sliderService.toggleActive(id);
  }
}
