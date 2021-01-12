import { Customer } from 'src/customer/entities/customer.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Ship } from 'src/ship/entities/ship.entity';

export class CreateOrderDto {
  nameCustomer: string;
  phoneCustomer: string;
  emailCustomer: string;
  addressCustomer: string;
  noteCustomer: string;
  payment: string;
  total: number;
  customer_id: Customer;
  createdAt: Date;
}
