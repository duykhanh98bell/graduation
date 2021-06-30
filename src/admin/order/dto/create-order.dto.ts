import { IsNotEmpty, Length, Max, Min } from 'class-validator';
import { Customer } from 'src/admin/customer/entities/customer.entity';
import { Payment } from 'src/admin/payment/entities/payment.entity';
import { Ship } from 'src/admin/ship/entities/ship.entity';

export class CreateOrderDto {
  code: string;
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
