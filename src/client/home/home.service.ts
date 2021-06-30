/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Attribute,
  AttributeDocument,
} from 'src/admin/attribute/entities/attribute.entity';
import { Brand, BrandDocument } from 'src/admin/brand/schemas/brand.schema';
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
import {
  OrderDetail,
  OrderDetailDocument,
} from 'src/admin/order-detail/entities/order-detail.entity';
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
    @InjectModel(Brand.name) private BrandModel: Model<BrandDocument>,
    @InjectModel(CategoryProduct.name)
    private CategoryProductModel: Model<CategoryProductDocument>,
    @InjectModel(Value.name)
    private ValueModel: Model<ValueDocument>,
    @InjectModel(Attribute.name)
    private AttributeModel: Model<AttributeDocument>,
    @InjectModel(OrderDetail.name)
    private OrderDetailModel: Model<OrderDetailDocument>,
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

  async findNav() {
    const [categoryParent, categories, brands] = await Promise.all([
      this.CategoryModel.find({ parent_id: null, nav_active: true }),
      this.CategoryModel.find({ nav_active: true }),
      this.BrandModel.find(),
    ]);
    return {
      categoryParent,
      categories,
      brands,
    };
  }

  async search(q: any) {
    // top 3 hightlight
    const productHighlight = await this.ProductModel.find({
      highlight: true,
    }).limit(3);

    // top 3 bán nhiều nhất
    const bestSeller = await this.VariantModel.aggregate([
      {
        $group: {
          _id: '$product_id',
          totalSaleAmount: {
            $sum: { $multiply: ['$sold'] },
          },
        },
      },
      {
        $sort: {
          totalSaleAmount: -1,
        },
      },
      {
        $limit: 3,
      },
    ]);
    const topSeller = [];
    for (const arr of bestSeller) {
      const pro = {
        product: await this.ProductModel.findOne({ _id: arr['_id'] }),
        total: arr['totalSaleAmount'],
      };
      topSeller.push(pro);
    }

    const [products, cateProducts, slider] = await Promise.all([
      this.ProductModel.find({ name: { $regex: q } }).populate('promotion_id'),
      this.CategoryProductModel.find().populate({
        path: 'category_id',
        populate: { path: 'product_id', populate: { path: 'promotion_id' } },
      }),
      this.SliderModel.find({ active: true }),
    ]);
    return {
      products,
      cateProducts,
      slider,
      productHighlight,
      topSeller,
    };
  }

  async collection(page: number) {
    const products = await await this.ProductModel.find().populate(
      'promotion_id',
    );
    const [cateProducts, values, attributes, slider] = await Promise.all([
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

  async findAll(page: number) {
    // top 3 hightlight
    const productHighlight = await this.ProductModel.find({
      highlight: true,
    }).limit(3);

    // top 3 bán nhiều nhất
    const bestSeller = await this.VariantModel.aggregate([
      {
        $group: {
          _id: '$product_id',
          totalSaleAmount: { $sum: { $multiply: ['$sold'] } },
        },
      },
      {
        $sort: {
          totalSaleAmount: -1,
        },
      },
      {
        $limit: 3,
      },
    ]);
    const topSeller = [];
    for (const arr of bestSeller) {
      const pro = {
        product: await this.ProductModel.findOne({ _id: arr['_id'] }),
        total: arr['totalSaleAmount'],
      };
      topSeller.push(pro);
    }

    // console.log(bestSeller);
    // console.log(topSeller);
    const countProducts = await this.ProductModel.find().count();
    const pageSize = 12;
    const totalPage = countProducts / pageSize;

    let start = pageSize * (page - 1);
    let end = pageSize * (page - 1) + pageSize;
    if(!page){
      start = 0;
      end = pageSize;
    }
    
    const allProducts = await this.ProductModel.find().populate('promotion_id').sort({ createdAt: -1 });
    const products = allProducts.slice(start, end);

    const [
      cateProducts,
      values,
      attributes,
      slider,
    ] = await Promise.all([
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
      productHighlight,
      topSeller,
      totalPage,
      page
    };
  }

  async filterCate(
    cate: string,
    xx: string,
    page: number,
    priceMin: number,
    priceMax: number,
    value: string,
    q: string,
  ) {
    // console.log(page);
    // console.log(priceMin);
    // console.log(priceMax);
    // console.log(xx);

    const findCate = await this.CategoryModel.findOne({ cate_slug: cate });
    const pageSize = 9;

    if (priceMin && priceMax) {
      // Lọc sản phẩm
      const arr = [];
      if (value !== undefined) {
        console.log(xx);
        
        // Trường hợp có value
        for (const element of value) {
          arr.push({ value: element });
        }

        let countAllPro = await this.CategoryProductModel.find({
          category_id: findCate._id,
        }).populate({
          path: 'product_id',
          match: {
            price: { $gte: priceMin, $lte: priceMax },
            $or: [{ $and: arr }, { value: value }],
          },
          populate: { path: 'promotion_id' },
        });

        if(xx !== undefined) {
          countAllPro = await this.CategoryProductModel.find({
            category_id: findCate._id,
          }).populate({
            path: 'product_id',
            match: {
              price: { $gte: priceMin, $lte: priceMax },
              $or: [{ $and: arr }, { value: value }],
              brand_id: { $in: xx },
            },
            populate: { path: 'promotion_id' },
          });
        }

        const countPro = countAllPro.filter((pr) => pr.product_id);
        const totalPage = countPro.length / pageSize;

        let start = pageSize * (page - 1);
        let end = pageSize * (page - 1) + pageSize;
        if(!page){
          start = 0;
          end = pageSize;
        }
        const filterPro = countAllPro.filter((pr) => pr.product_id);
        const findPro = filterPro.slice(start, end);

        return { findPro, title: findCate.name, totalPage, page };
      } else {
        // Không có value
        let countAllPro = await this.CategoryProductModel.find({
          category_id: findCate._id,
        }).populate({
          path: 'product_id',
          match: {
            price: { $gte: priceMin, $lte: priceMax }
          },
          populate: { path: 'promotion_id' },
        });

        if(xx!==undefined) {
          countAllPro = await this.CategoryProductModel.find({
            category_id: findCate._id,
          }).populate({
            path: 'product_id',
            match: {
              price: { $gte: priceMin, $lte: priceMax },
              brand_id: { $in: xx }
            },
            populate: { path: 'promotion_id' },
          });
        }

        const countPro = countAllPro.filter((pr) => pr.product_id);
        const totalPage = countPro.length / pageSize;

        let start = pageSize * (page - 1);
        let end = pageSize * (page - 1) + pageSize;
        if(!page){
          start = 0;
          end = pageSize;
        }
        const filterPro = countAllPro.filter((pr) => pr.product_id);
        const findPro = filterPro.slice(start, end);
        
        return { findPro, title: findCate.name, totalPage, page };
      }
    } else {
      const totalPro = await this.CategoryProductModel.find({
        category_id: findCate._id,
      }).count();
      const totalPage = totalPro / pageSize;

      // Trường hợp không lọc sản phẩm
      const findPro = await this.CategoryProductModel.find({
        category_id: findCate._id,
      })
        .populate({
          path: 'product_id',
          populate: 'promotion_id',
        })
        .skip(pageSize * (page - 1))
        .limit(pageSize);

      return { findPro, title: findCate.name, page, totalPage };
    }
  }

  async findDetail(slug: string) {
    const detail = await this.ProductModel.findOne({
      product_slug: slug,
    }).populate('promotion_id');
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
      }).populate({ path: 'product_id', populate: 'promotion_id' }),
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
      .populate('trend_id')
      .populate('promotion_id');
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
