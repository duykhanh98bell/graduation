import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCustomerDto } from '../customer/dto/update-customer.dto';
import {
  Customer,
  CustomerDocument
} from '../customer/entities/customer.entity';
import {
  OrderDetail,
  OrderDetailDocument
} from '../order-detail/entities/order-detail.entity';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { Ship, ShipDocument } from '../ship/entities/ship.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private OrderModel: Model<OrderDocument>,
    @InjectModel(Customer.name) private CustomerModel: Model<CustomerDocument>,
    @InjectModel(OrderDetail.name)
    private OrderDetailModel: Model<OrderDetailDocument>,
    @InjectModel(Ship.name)
    private ShipModel: Model<ShipDocument>
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll(): Promise<OrderDocument[]> {
    const allBill = await this.OrderModel.find({
      $and: [{ status: { $ne: 6 } }, { status: { $ne: 7 } }]
    })
      .populate('customer_id')
      .sort({ createdAt: -1 });
    return allBill;
  }

  async findDetail(id: any): Promise<OrderDetailDocument[]> {
    const findOrder = await this.OrderDetailModel.find({
      order_id: id
    }).populate('product_id');
    return findOrder;
  }

  async toggle(id: string, UpdateOrderDto: UpdateOrderDto) {
    return await this.OrderModel.findByIdAndUpdate(id, {
      $set: {
        status: +UpdateOrderDto.status,
        soldAt: new Date()
      }
    });
  }

  async findOrder(id: string) {
    return await this.OrderModel.findById(id).populate({ path: 'customer_id' });
  }

  async findShip() {
    return await this.ShipModel.find();
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
    updateCustomerDto: UpdateCustomerDto
  ) {
    const ship = await this.ShipModel.findById(updateOrderDto.ship_id);
    console.log(updateOrderDto);

    const putOrder = await this.OrderModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status: updateOrderDto.status,
          // total: +updateOrderDto.total,
          address: updateOrderDto.address,
          note: updateOrderDto.note,
          // sale: +updateOrderDto.sale,
          payment: updateOrderDto.payment,
          ship_id: updateOrderDto.ship_id,
          shipName: ship.name,
          shipTotal: ship.price
        }
      },
      { new: true }
    );
    // await this.CustomerModel.findByIdAndUpdate(putOrder.customer_id, {
    //   $set: {
    //     name: updateCustomerDto.name,
    //     phone: updateCustomerDto.phone,
    //     email: updateCustomerDto.email
    //   }
    // });
    return;
  }

  async remove(id: any) {
    await this.OrderModel.findByIdAndRemove(id);
    await this.OrderDetailModel.findOneAndRemove({ order_id: id });
    return;
  }
}
