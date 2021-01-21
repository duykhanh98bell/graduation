import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  OrderDetail,
  OrderDetailDocument,
} from '../order-detail/entities/order-detail.entity';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private OrderModel: Model<OrderDocument>,
    @InjectModel(OrderDetail.name)
    private OrderDetailModel: Model<OrderDetailDocument>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll(): Promise<OrderDocument[]> {
    const allBill = await this.OrderModel.find()
      .populate('customer_id')
      .sort({ createdAt: -1 });
    return allBill;
  }

  async findDetail(id: any): Promise<OrderDetailDocument[]> {
    const findOrder = await this.OrderDetailModel.find({
      order_id: id,
    }).populate('product_id');
    return findOrder;
  }

  async toggle(id: string) {
    const checkStatus = await this.OrderModel.findById(id);
    return await this.OrderModel.findByIdAndUpdate(id, {
      $set: {
        status: !checkStatus.status,
      },
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
