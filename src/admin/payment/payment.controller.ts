import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Redirect,
  UseInterceptors,
  Render,
  UploadedFile,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ViewAuthFilter } from '../http-exception/http-exception.filter';

export const storage = {
  storage: diskStorage({
    destination: './public/uploads/payment',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@UseGuards(JwtAuthGuard)
@UseFilters(ViewAuthFilter)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/create')
  @Render('admin/partials/payment/create')
  getCreate() {
    return {
      pageName: 'Thêm mới phương thức thanh toán!',
      title: 'Phương thức thanh toán',
    };
  }

  @Post('/create')
  @Redirect('/payment/')
  @UseInterceptors(FileInterceptor('logo', storage))
  create(@Body() createPaymentDto: CreatePaymentDto, @UploadedFile() file) {
    return this.paymentService.create(createPaymentDto, file);
  }

  @Get()
  @Render('admin/partials/payment/read')
  async findAll() {
    const getPayments = await this.paymentService.findAll();
    return {
      pageName: 'Danh sách phương thức thanh toán',
      getPayments,
      title: 'Phương thức thanh toán',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Get('/update/:id')
  @Render('admin/partials/payment/update')
  async getUpdate(@Param('id') id: string) {
    const getUpdate = await this.paymentService.findOne(id);
    return {
      pageName: 'Cập nhật phương thức thanh toán',
      getUpdate,
      title: 'Phương thức thanh toán',
    };
  }

  @Post('/update/:id')
  @UseInterceptors(FileInterceptor('logo', storage))
  @Redirect('/payment/')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
    @UploadedFile() file,
  ) {
    await this.paymentService.update(id, updatePaymentDto, file);
    return;
  }

  @Get('/delete/:id')
  @Redirect('/payment/')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
