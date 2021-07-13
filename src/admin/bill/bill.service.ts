import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Customer,
  CustomerDocument
} from '../customer/entities/customer.entity';
import {
  OrderDetail,
  OrderDetailDocument
} from '../order-detail/entities/order-detail.entity';
import { Order, OrderDocument } from '../order/entities/order.entity';
import { Ship, ShipDocument } from '../ship/entities/ship.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Injectable()
export class BillService {
  constructor(
    @InjectModel(Order.name) private OrderModel: Model<OrderDocument>,
    @InjectModel(Customer.name) private CustomerModel: Model<CustomerDocument>,
    @InjectModel(Ship.name) private ShipModel: Model<ShipDocument>,
    @InjectModel(OrderDetail.name)
    private OrderDetailModel: Model<OrderDetailDocument>
  ) {}

  create(createBillDto: CreateBillDto) {
    return 'This action adds a new bill';
  }

  async findAll(): Promise<OrderDocument[]> {
    const allBill = await this.OrderModel.find({
      $or: [{ status: 6 }, { status: 7 }]
    })
      .populate('customer_id')
      .sort({ createdAt: -1 });
    return allBill;
  }

  findOne(id: number) {
    return `This action returns a #${id} bill`;
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
