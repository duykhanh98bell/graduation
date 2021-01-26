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
  UseGuards,
} from '@nestjs/common';
import { ShipService } from './ship.service';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// quan trong
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

export const storage = {
  storage: diskStorage({
    destination: './public/uploads/ship',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@UseGuards(JwtAuthGuard)
@Controller('ship')
export class ShipController {
  constructor(private readonly shipService: ShipService) {}

  @Get('/create')
  @Render('admin/partials/ship/create')
  getCreateShip() {
    return {
      pageName: 'Thêm mới đơn vị vận chuyển',
      title: 'Đơn vị giao hàng',
    };
  }

  @Post('/create')
  @Redirect('/ship')
  @UseInterceptors(FileInterceptor('logo', storage))
  async create(@Body() createShipDto: CreateShipDto, @UploadedFile() file) {
    await this.shipService.create(createShipDto, file);
    return { pageName: 'them thanh cong' };
  }

  @Get()
  @Render('admin/partials/ship/read')
  async findAll() {
    const ships = await this.shipService.findAll();
    return {
      ships,
      title: 'Đơn vị giao hàng',
      pageName: 'Danh sách đơn vị giao hàng',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { ship: this.shipService.findOne(id), title: 'Đơn vị giao hàng' };
  }

  @Get('/update/:id')
  @Render('admin/partials/ship/update')
  async getUpdate(@Param('id') id: string) {
    const ship = await this.shipService.findOne(id);
    return {
      ship,
      pageName: 'Sửa đơn vị vận chuyển',
      title: 'Đơn vị giao hàng',
    };
  }

  @Post('/update/:id')
  @UseInterceptors(FileInterceptor('logo', storage))
  @Redirect('/ship')
  async update(
    @Param('id') id: string,
    @Body() updateShipDto: UpdateShipDto,
    @UploadedFile() file,
  ) {
    await this.shipService.update(id, updateShipDto, file);
    return;
  }

  @Get('/delete/:id')
  @Redirect('/ship')
  remove(@Param('id') id: string) {
    return this.shipService.remove(id);
  }
}
