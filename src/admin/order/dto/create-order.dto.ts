import { Customer } from 'src/admin/customer/entities/customer.entity';
import { Payment } from 'src/admin/payment/entities/payment.entity';
import { Ship } from 'src/admin/ship/entities/ship.entity';

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
