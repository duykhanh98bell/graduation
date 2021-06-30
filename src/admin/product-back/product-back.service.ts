import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Customer,
  CustomerDocument,
} from '../customer/entities/customer.entity';
import { UpdateOrderDetailDto } from '../order-detail/dto/update-order-detail.dto';
import {
  OrderDetail,
  OrderDetailDocument,
} from '../order-detail/entities/order-detail.entity';
import { Order, OrderDocument } from '../order/entities/order.entity';
import { CreateProductBackDto } from './dto/create-product-back.dto';
import { UpdateProductBackDto } from './dto/update-product-back.dto';

@Injectable()
export class ProductBackService {
  constructor(
    @InjectModel(Order.name) private OrderModel: Model<OrderDocument>,
    @InjectModel(Customer.name) private CustomerModel: Model<CustomerDocument>,
    @InjectModel(OrderDetail.name)
    private OrderDetailModel: Model<OrderDetailDocument>,
  ) {}

  create(createProductBackDto: CreateProductBackDto) {
    return 'This action adds a new productBack';
  }

  async billFail() {
    const bill = await this.OrderDetailModel.find({ status: false }).populate({
      path: 'order_id',
      populate: 'customer_id',
    });
    return bill;
  }

  async findDetail() {
    const findProductError = await this.OrderDetailModel.find({
      status: false,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: 'product_id',
      })
      .populate({ path: 'order_id' });
    return findProductError;
  }

  async repair(id: string, updateOrderDetailDto: UpdateOrderDetailDto) {
    return await this.OrderDetailModel.findByIdAndUpdate(id, {
      $set: {
        repair: +updateOrderDetailDto.repair,
      },
    });
  }

  async UpdateQuantityError(
    id: string,
    updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    const findQuantity = await this.OrderDetailModel.findById(id);
    if (updateOrderDetailDto.quantityError <= findQuantity.quantity) {
      await this.OrderDetailModel.findByIdAndUpdate(id, {
        $set: {
          quantityError: +updateOrderDetailDto.quantityError,
        },
      });
    }
    return;
  }

  remove(id: number) {
    return `This action removes a #${id} productBack`;
  }
}
