import { Order } from 'src/admin/order/entities/order.entity';
import { Product } from 'src/admin/product/entities/product.entity';

export class CreateOrderDetailDto {
  product_id: Product;

  product_id_string: string;

  order_id: Order;

  size: string;

  color: string;

  price: number;

  quantity: number;

  status: boolean;
}
