/* eslint-disable prefer-const */
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
import { Product, ProductDocument } from '../product/entities/product.entity';
import {
  Promotion,
  PromotionDocument
} from '../promotion/entities/promotion.entity';
import { VariantDocument } from '../variant/entities/variant.entity';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

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
    @InjectModel('Variant')
    private VariantModel: Model<VariantDocument>
  ) {}
  async total(timezone: string, from: any, to: any) {
    let start: any;
    let end: any;
    switch (timezone) {
      case 'today':
        start = moment().startOf('day');
        end = moment();
        break;
      case 'yesterday':
        start = moment().subtract(1, 'days').startOf('day');
        end = moment().subtract(1, 'days').endOf('day');
        break;
      case 'week':
        start = moment().subtract(7, 'days').startOf('day');
        end = moment();
        break;
      case 'month':
        start = moment().subtract(30, 'days').startOf('day');
        end = moment();
        break;
      // case 'year':
      //   start = moment().subtract(30, 'days').startOf('day');
      //   end = moment();
      //   break;
      case 'all':
        start = moment('2020-10-20');
        end = moment();
        break;
      default:
        start = moment().startOf('day');
        end = moment();
        break;
    }
    console.log(from, to);

    if (from && to) {
      start = moment(from).startOf('day');
      end = moment(to).endOf('day');
    }
    const productSoles = await this.OrderDetailModel.find({
      status: true
    })
      .populate({
        path: 'order_id',
        match: { status: { $in: [6, 7] }, soldAt: { $gte: start, $lte: end } }
      })
      .populate('product_id');
    // .populate({
    //   path: 'order_id',
    //   match: { soldAt: { $gte: start, $lte: end } }
    // });
    const total = await productSoles.filter((data) => data?.order_id?.code);

    let totalProductSoles = 0;
    for (const { quantity } of total) {
      totalProductSoles += quantity;
    }

    let tong_gia_si = 0;
    for (const { quantity, product_id } of total) {
      tong_gia_si += quantity * product_id.price_in;
    }

    const orderSoles = await this.OrderModel.find({
      $or: [{ status: 6 }, { status: 7 }],
      soldAt: { $gte: start, $lte: end }
    });
    let tong_doanh_thu = 0;
    orderSoles.forEach((doanh_thu) => {
      tong_doanh_thu += doanh_thu.total;
    });

    const orderDetailFails = await this.OrderDetailModel.find({
      status: false,
      soldAt: { $gte: start, $lte: end }
    });
    let tong_san_phan_loi = 0;
    for (const { quantityError } of orderDetailFails) {
      tong_san_phan_loi += quantityError;
    }

    const khach_mua_hang = await this.OrderModel.find({
      soldAt: { $gte: start, $lte: end }
    })
      .distinct('customer_id')
      .count();

    const bestSeller = await this.OrderDetailModel.aggregate([
      {
        $group: {
          _id: '$product_id',
          totalSalePrice: {
            $sum: { $multiply: ['$total_price'] }
          }
          // order: { $push: '$order' },
        }
      },
      {
        $sort: {
          totalSalePrice: -1
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'patient_doc'
        }
      }
    ]);

    // const lookProduct = await this.OrderDetailModel.find()
    //   .populate('product_id')
    //   .populate({
    //     path: 'order_id',
    //     match: { soldAt: { $gte: start, $lte: end } }
    //   });
    // const arrayProduct = lookProduct.filter((pro) => pro.order_id);
    // const arrayId = arrayProduct.map((pro) => pro.product_id['_id']);
    // console.log(arrayId);

    // let bestSeller = [];
    // for (let index = 0; index < bestSellerAll.length; index++) {
    //   const element: any = bestSellerAll[index];
    //   for (let index1 = 0; index1 < arrayId.length; index1++) {
    //     const element1 = arrayId[index1];
    //     if (JSON.stringify(element._id) === JSON.stringify(element1)) {
    //       bestSeller.push(element);
    //     }
    //   }
    // }
    // console.log(bestSeller);

    // const list_hoa_don_ok = lookProduct.filter(
    //   (pro) => pro?.order_id?.status === 6,
    // );

    const [
      tong_don_hang,
      tong_chua_xu_ly,
      tong_khach_huy,
      tong_dang_xac_nhan,
      tong_da_xac_nhan,
      tong_he_thong_huy,
      tong_hoa_don,
      tong_don_thanh_cong,
      tong_hoa_don_loi
    ] = await Promise.all([
      this.OrderModel.find({ soldAt: { $gte: start, $lte: end } }).count(),
      this.OrderModel.find({
        status: 1,
        soldAt: { $gte: start, $lte: end }
      }).count(),
      this.OrderModel.find({
        status: 2,
        soldAt: { $gte: start, $lte: end }
      }).count(),
      this.OrderModel.find({
        status: 3,
        soldAt: { $gte: start, $lte: end }
      }).count(),
      this.OrderModel.find({
        status: 4,
        soldAt: { $gte: start, $lte: end }
      }).count(),
      this.OrderModel.find({
        status: 5,
        soldAt: { $gte: start, $lte: end }
      }).count(),
      this.OrderModel.find({
        $or: [{ status: 6 }, { status: 7 }],
        soldAt: { $gte: start, $lte: end }
      }).count(),
      this.OrderModel.find({
        status: 6,
        soldAt: { $gte: start, $lte: end }
      }).count(),
      this.OrderModel.find({
        status: 7,
        soldAt: { $gte: start, $lte: end }
      }).count()
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
      timezone,
      bestSeller,
      khach_mua_hang
    };
  }

  async notification() {
    const orderDetailFails = await this.OrderDetailModel.find({
      status: false
    });
    let tong_san_phan_loi = 0;
    for (const { quantityError } of orderDetailFails) {
      tong_san_phan_loi += quantityError;
    }
    const [
      tong_don_hang,
      tong_chua_xu_ly,
      tong_khach_huy,
      tong_dang_xac_nhan,
      tong_da_xac_nhan,
      tong_he_thong_huy,
      tong_hoa_don,
      tong_don_thanh_cong,
      tong_hoa_don_loi
    ] = await Promise.all([
      this.OrderModel.find({}).count(),
      this.OrderModel.find({
        status: 1
      }).count(),
      this.OrderModel.find({
        status: 2
      }).count(),
      this.OrderModel.find({
        status: 3
      }).count(),
      this.OrderModel.find({
        status: 4
      }).count(),
      this.OrderModel.find({
        status: 5
      }).count(),
      this.OrderModel.find({
        $or: [{ status: 6 }, { status: 7 }]
      }).count(),
      this.OrderModel.find({
        status: 6
      }).count(),
      this.OrderModel.find({
        status: 7
      }).count()
    ]);

    return {
      tong_san_phan_loi,
      tong_don_hang,
      tong_chua_xu_ly,
      tong_khach_huy,
      tong_dang_xac_nhan,
      tong_da_xac_nhan,
      tong_he_thong_huy,
      tong_hoa_don,
      tong_don_thanh_cong,
      tong_hoa_don_loi
    };
  }

  async tieuChiSanPham() {
    const bestSeller = await this.VariantModel.aggregate([
      {
        $group: {
          _id: '$product_id',
          totalSaleAmount: {
            $sum: { $multiply: ['$sold'] }
          }
        }
      },
      {
        $sort: {
          totalSaleAmount: -1
        }
      }
      // {
      //   $limit: 3,
      // },
    ]);
    const topSeller = [];
    for (const arr of bestSeller) {
      const pro = {
        product: await this.ProductModel.findOne({ _id: arr['_id'] }),
        total: arr['totalSaleAmount']
      };
      topSeller.push(pro);
    }

    const productHighlight = await this.ProductModel.find({
      highlight: true
    }).sort({ createdAt: -1 });

    const inStock = await this.VariantModel.find();
    const so_luong_con_lai = inStock.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    );

    const so_luong_da_ban = inStock.reduce(
      (accumulator, currentValue) => accumulator + currentValue.sold,
      0
    );

    const orderDetailFails = await this.OrderDetailModel.find({
      status: false
    });
    let tong_san_phan_loi = 0;
    for (const { quantityError } of orderDetailFails) {
      tong_san_phan_loi += quantityError;
    }
    const [
      tong_don_hang,
      tong_chua_xu_ly,
      tong_khach_huy,
      tong_dang_xac_nhan,
      tong_da_xac_nhan,
      tong_he_thong_huy,
      tong_hoa_don,
      tong_don_thanh_cong,
      tong_hoa_don_loi
    ] = await Promise.all([
      this.OrderModel.find({}).count(),
      this.OrderModel.find({
        status: 1
      }).count(),
      this.OrderModel.find({
        status: 2
      }).count(),
      this.OrderModel.find({
        status: 3
      }).count(),
      this.OrderModel.find({
        status: 4
      }).count(),
      this.OrderModel.find({
        status: 5
      }).count(),
      this.OrderModel.find({
        $or: [{ status: 6 }, { status: 7 }]
      }).count(),
      this.OrderModel.find({
        status: 6
      }).count(),
      this.OrderModel.find({
        status: 7
      }).count()
    ]);
    return {
      bestSeller,
      topSeller,
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
      productHighlight,
      so_luong_con_lai,
      so_luong_da_ban
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
