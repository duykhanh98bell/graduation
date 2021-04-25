/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Attribute,
  AttributeDocument,
} from 'src/admin/attribute/entities/attribute.entity';
import {
  CategoryProduct,
  CategoryProductDocument,
} from 'src/admin/category-product/entities/category-product.entity';
import {
  Category,
  CategoryDocument,
} from 'src/admin/category/entities/category.entity';
import {
  ImageProduct,
  ImageProductDocument,
} from 'src/admin/image-product/entities/image-product.entity';
import { PolicyDocument } from 'src/admin/policy/entities/policy.entity';
import {
  Product,
  ProductDocument,
} from 'src/admin/product/entities/product.entity';
import {
  Slider,
  SliderDocument,
} from 'src/admin/slider/entities/slider.entity';
import { ValueProductDocument } from 'src/admin/value-product/entities/value-product.entity';
import { Value, ValueDocument } from 'src/admin/value/entities/value.entity';
import { VariantValueDocument } from 'src/admin/variant-value/entities/variant-value.entity';
import { VariantDocument } from 'src/admin/variant/entities/variant.entity';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';

@Injectable()
export class HomeService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
    @InjectModel(Slider.name) private SliderModel: Model<SliderDocument>,
    @InjectModel(Category.name) private CategoryModel: Model<CategoryDocument>,
    @InjectModel(CategoryProduct.name)
    private CategoryProductModel: Model<CategoryProductDocument>,
    @InjectModel(Value.name)
    private ValueModel: Model<ValueDocument>,
    @InjectModel(Attribute.name)
    private AttributeModel: Model<AttributeDocument>,
    @InjectModel('Image')
    private ImageProductModel: Model<ImageProductDocument>,
    @InjectModel('Variant')
    private VariantModel: Model<VariantDocument>,
    @InjectModel('VariantValue')
    private VariantValueModel: Model<VariantValueDocument>,
    @InjectModel('ValueProduct')
    private ValueProductModel: Model<ValueProductDocument>,
    @InjectModel('Policy')
    private PolicyModel: Model<PolicyDocument>,
  ) {}
  create(createHomeDto: CreateHomeDto) {
    return 'This action adds a new home';
  }

  async findNav() {
    const [categoryParent, categories] = await Promise.all([
      this.CategoryModel.find({ parent_id: null, nav_active: true }),
      this.CategoryModel.find({ nav_active: true }),
    ]);
    return {
      categoryParent,
      categories,
    };
  }

  async findAll() {
    const [
      products,
      cateProducts,
      values,
      attributes,
      slider,
    ] = await Promise.all([
      this.ProductModel.find(),
      this.CategoryProductModel.find().populate({ path: 'category_id' }),
      this.ValueModel.find(),
      this.AttributeModel.find(),
      this.SliderModel.find({ active: true }),
    ]);
    return {
      products,
      cateProducts,
      values,
      attributes,
      slider,
    };
  }

  async filterCate(cate: string, page: number) {
    const findCate = await this.CategoryModel.findOne({ cate_slug: cate });
    const findPro = await this.CategoryProductModel.find({
      category_id: findCate._id,
    }).populate('product_id');
    return { findPro, title: findCate.name };
  }

  async findDetail(slug: string) {
    const detail = await this.ProductModel.findOne({ product_slug: slug });
    const categoryProductChoose = await this.CategoryProductModel.findOne({
      product_id: detail._id,
    });
    const [
      categoryParent,
      cateProducts,
      categories,
      attributes,
      valueProducts,
      relateds,
    ] = await Promise.all([
      this.CategoryModel.find({ parent_id: null, nav_active: true }),
      this.CategoryProductModel.find().populate('category_id'),
      this.CategoryModel.find({ nav_active: true }),
      this.AttributeModel.find(),
      this.ValueProductModel.find()
        .populate({
          path: 'product_id',
          match: { _id: detail._id },
        })
        .populate({ path: 'value_id' }),
      this.CategoryProductModel.find({
        category_id: categoryProductChoose.category_id,
        product_id: { $ne: categoryProductChoose.product_id },
      })
        .populate('product_id')
        .limit(4),
    ]);
    return {
      categoryParent,
      cateProducts,
      categories,
      attributes,
      valueProducts,
      relateds,
    };
  }

  async detail(slug: string) {
    const detail = await this.ProductModel.findOne({ product_slug: slug })
      .populate('brand_id')
      .populate('trend_id');
    const images = await this.ImageProductModel.find({
      product_id: detail._id,
    });
    return { detail, images };
  }

  async policy() {
    return await this.PolicyModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} home`;
  }

  update(id: number, updateHomeDto: UpdateHomeDto) {
    return `This action updates a #${id} home`;
  }

  async remove(id: number) {
    return `This action removes a #${id} home`;
  }
}
