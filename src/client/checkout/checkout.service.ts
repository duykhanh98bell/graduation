import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CategoryProduct,
  CategoryProductDocument,
} from 'src/admin/category-product/entities/category-product.entity';
import {
  Category,
  CategoryDocument,
} from 'src/admin/category/entities/category.entity';
import { CreateOrderDto } from 'src/admin/order/dto/create-order.dto';
import {
  Payment,
  PaymentDocument,
} from 'src/admin/payment/entities/payment.entity';
import { Ship, ShipDocument } from 'src/admin/ship/entities/ship.entity';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectModel(Category.name) private CategoryModel: Model<CategoryDocument>,
    @InjectModel(CategoryProduct.name)
    private CategoryProductModel: Model<CategoryProductDocument>,
    @InjectModel(Payment.name) private PaymentModel: Model<PaymentDocument>,
    @InjectModel(Ship.name) private ShipModel: Model<ShipDocument>,
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

  order(createOrderDto: CreateOrderDto, req, res) {
    return;
  }
}
