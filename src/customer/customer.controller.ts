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
  Res,
} from '@nestjs/common';
import { CustomerDTO } from './dto/customer.dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private CustomerService: CustomerService) {}

  @Post('/create')
  async postCustomer(@Body() payload: CustomerDTO, @Res() res) {
    const postCustomer = await this.CustomerService.create(payload);
    return res.status(HttpStatus.OK).json({
      message: 'Created new Customer !',
      Customer: postCustomer,
      title: 'Customer',
    });
  }

  @Get()
  async getAllCustomer() {
    return await this.CustomerService.getAll();
  }

  @Get(':id')
  async getOneCustomer(@Param('id') id: string) {
    const getOne = await this.CustomerService.getOne(id);
    if (!getOne)
      throw new NotFoundException('Khong tim thay thong tin nguoi dung');
    return getOne;
  }

  @Put('/update/:id')
  async updateOne(
    @Res() res,
    @Body() payload: CustomerDTO,
    @Param('id') id: string,
  ) {
    const updateOne = await this.CustomerService.updateOneCustomer(id, payload);
    return res.status(HttpStatus.OK).json({
      message: 'updated !',
      customer: updateOne,
      title: 'Customer',
    });
  }

  @Delete('/delete/:id')
  async deleteOne(@Res() res, @Param('id') id: string) {
    const deleteOne = await this.CustomerService.deleteOneCustomer(id);
    return res.status(HttpStatus.OK).json({
      message: 'Deleted !',
      customer: deleteOne,
      title: 'Customer',
    });
  }
}
