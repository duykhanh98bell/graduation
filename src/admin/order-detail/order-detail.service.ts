import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import {
  OrderDetail,
  OrderDetailDocument,
} from './entities/order-detail.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectModel(OrderDetail.name)
    private OrderDetailModel: Model<OrderDetailDocument>,
  ) {}
  create(createOrderDetailDto: CreateOrderDetailDto) {
    return 'This action adds a new orderDetail';
  }

  findAll() {
    return `This action returns all orderDetail`;
  }

  async findOne(id: any): Promise<OrderDetailDocument[]> {
    const findDetail = await this.OrderDetailModel.find({
      order_id: id,
    }).populate('product_id');
    return findDetail;
  }

  async toggle(id: string) {
    const check = await this.OrderDetailModel.findById(id);
    return await this.OrderDetailModel.findByIdAndUpdate(id, {
      $set: {
        status: !check.status,
        repair: 1,
        quantityError: 1,
      },
    });
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
