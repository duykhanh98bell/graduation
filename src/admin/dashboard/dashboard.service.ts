import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Customer,
  CustomerDocument,
} from '../customer/entities/customer.entity';
import {
  OrderDetail,
  OrderDetailDocument,
} from '../order-detail/entities/order-detail.entity';
import { Order, OrderDocument } from '../order/entities/order.entity';
import { Product, ProductDocument } from '../product/entities/product.entity';
import {
  Promotion,
  PromotionDocument,
} from '../promotion/entities/promotion.entity';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Promotion.name)
    private PromotionModel: Model<PromotionDocument>,
    @InjectModel(Product.name)
    private ProductModel: Model<ProductDocument>,
    @InjectModel(Order.name)
    private OrderModel: Model<OrderDocument>,
    @InjectModel(OrderDetail.name)
    private OrderDetailModel: Model<OrderDetailDocument>,
    @InjectModel(Customer.name)
    private CustomerModel: Model<CustomerDocument>,
  ) {}
  async total() {
    const productSoles = await this.OrderDetailModel.find({
      status: true,
    })
      .populate({ path: 'order_id', match: { status: { $in: [6, 7] } } })
      .populate('product_id');
    const total = await productSoles.filter((data) => data.order_id);

    let totalProductSoles = 0;
    for (const { quantity } of total) {
      totalProductSoles += quantity;
    }
    // console.log(totalProductSoles);

    let tong_gia_si = 0;
    for (const { quantity, product_id } of total) {
      // console.log(quantity, product_id.price_in);

      tong_gia_si += quantity * product_id.price_in;
      // console.log(tong_gia_si);
    }

    const orderSoles = await this.OrderModel.find({
      $or: [{ status: 6 }, { status: 7 }],
    });
    let tong_doanh_thu = 0;
    orderSoles.forEach((doanh_thu) => {
      tong_doanh_thu += doanh_thu.total;
    });
    // console.log(tong_doanh_thu);

    const orderDetailFails = await this.OrderDetailModel.find({
      status: false,
    });
    let tong_san_phan_loi = 0;
    for (const { quantityError } of orderDetailFails) {
      tong_san_phan_loi += quantityError;
    }
    // console.log(tong_san_phan_loi);

    const [
      tong_don_hang,
      tong_chua_xu_ly,
      tong_khach_huy,
      tong_dang_xac_nhan,
      tong_da_xac_nhan,
      tong_he_thong_huy,
      tong_hoa_don,
      tong_don_thanh_cong,
      tong_hoa_don_loi,
    ] = await Promise.all([
      this.OrderModel.find({}).count(),
      this.OrderModel.find({ status: 1 }).count(),
      this.OrderModel.find({ status: 2 }).count(),
      this.OrderModel.find({ status: 3 }).count(),
      this.OrderModel.find({ status: 4 }).count(),
      this.OrderModel.find({ status: 5 }).count(),
      this.OrderModel.find({ $or: [{ status: 6 }, { status: 7 }] }).count(),
      this.OrderModel.find({ status: 6 }).count(),
      this.OrderModel.find({ status: 7 }).count(),
    ]);

    return {
      totalProductSoles,
      tong_doanh_thu,
      tong_san_phan_loi,
      tong_don_hang,
      tong_chua_xu_ly,
      tong_khach_huy,
      tong_dang_xac_nhan,
      tong_da_xac_nhan,
      tong_he_thong_huy,
      tong_hoa_don,
      tong_don_thanh_cong,
      tong_hoa_don_loi,
      tong_gia_si,
    };
  }

  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  findAll() {
    return `This action returns all dashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
