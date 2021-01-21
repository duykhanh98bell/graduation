import { Customer } from 'src/admin/customer/entities/customer.entity';
import { Payment } from 'src/admin/payment/entities/payment.entity';
import { Ship } from 'src/admin/ship/entities/ship.entity';

export class CreateOrderDto {
  total: number;
  customer_id: Customer;
  address: string;
  note: string;
  status: boolean;
  sale: string;
  payment: string;
}
