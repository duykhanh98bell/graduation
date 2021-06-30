import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, Length } from 'class-validator';
import { Customer } from 'src/admin/customer/entities/customer.entity';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  total: number;
  customer_id: Customer;

  @IsNotEmpty({ message: 'Dia chi khong duoc de trong' })
  @Length(10, 500, { message: 'Dia chi 10 - 500 ki tu' })
  address: string;
  note: string;
  status: number;
  sale: number;
  payment: string;
}
