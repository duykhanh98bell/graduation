import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import {
  CategoryProduct,
  CategoryProductDocument,
} from 'src/admin/category-product/entities/category-product.entity';
import {
  Category,
  CategoryDocument,
} from 'src/admin/category/entities/category.entity';
import { CreateCustomerDto } from 'src/admin/customer/dto/create-customer.dto';
import {
  Customer,
  CustomerDocument,
} from 'src/admin/customer/entities/customer.entity';
import { CreateOrderDetailDto } from 'src/admin/order-detail/dto/create-order-detail.dto';
import {
  OrderDetail,
  OrderDetailDocument,
} from 'src/admin/order-detail/entities/order-detail.entity';
import { CreateOrderDto } from 'src/admin/order/dto/create-order.dto';
import { Order, OrderDocument } from 'src/admin/order/entities/order.entity';
import {
  Variant,
  VariantDocument,
} from 'src/admin/variant/entities/variant.entity';

import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectModel(Category.name) private CategoryModel: Model<CategoryDocument>,
    @InjectModel(CategoryProduct.name)
    private CategoryProductModel: Model<CategoryProductDocument>,
    @InjectModel(Order.name) private OrderModel: Model<OrderDocument>,
    @InjectModel(OrderDetail.name)
    private OrderDetailModel: Model<OrderDetailDocument>,
    @InjectModel(Customer.name) private CustomerModel: Model<CustomerDocument>,
    @InjectModel(Variant.name) private VariantModel: Model<VariantDocument>,
  ) {}

  async findAll() {
    const [categoryParent, cateProducts] = await Promise.all([
      this.CategoryModel.find({ parent_id: null, nav_active: true }),
      this.CategoryProductModel.find().populate('category_id'),
    ]);
    return {
      categoryParent,
      cateProducts,
    };
  }

  async order(
    createOrderDto: CreateOrderDto,
    createCustomerDto: CreateCustomerDto,
    createOrderDetailDto: CreateOrderDetailDto,
    req: any,
    res: any,
  ) {
    const customer = await new this.CustomerModel({
      name: createCustomerDto.name,
      phone: createCustomerDto.phone,
      email: createCustomerDto.email,
    }).save();
    if (!req.session.percentSale) req.session.percentSale = 0;
    const time = new Date();
    const code =
      'DH' +
      time.getFullYear() +
      '' +
      (time.getMonth() + 1) +
      '' +
      Math.floor(Math.random() * 10000);
    const order = await new this.OrderModel({
      code: code,
      total: createOrderDto.total,
      customer_id: customer._id,
      address: createOrderDto.address,
      note: createOrderDto.note,
      sale: req.session.percentSale,
      payment: createOrderDto.payment,
    }).save();
    const cart = req.session.cart;
    cart.forEach(async (product) => {
      new this.OrderDetailModel({
        product_id: product.id,
        product_id_string: product.id,
        order_id: order._id,
        price: product.price,
        quantity: product.quantity,
        size: product.size,
        color: product.color,
      }).save();
      const checkQty = await this.VariantModel.findById(product.variant);
      await this.VariantModel.findByIdAndUpdate(product.variant, {
        $set: {
          quantity: checkQty.quantity - +product.quantity,
          sold: checkQty.sold + +product.quantity,
        },
      });
    });
    delete req.session.cart;
    delete req.session.totalCart;
    delete req.session.priceSale;
    delete req.session.total;
    delete req.session.percentSale;
    req.session.message = {
      type: 'success',
      message: 'Mua hàng thành công',
    };

    return res.redirect('/');
  }
}
