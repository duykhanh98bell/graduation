/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Attribute,
  AttributeDocument,
} from 'src/admin/attribute/entities/attribute.entity';
import { Blog, BlogDocument } from 'src/admin/blog/entities/blog.entity';
import { Brand, BrandDocument } from 'src/admin/brand/schemas/brand.schema';
import {
  CategoryProduct,
  CategoryProductDocument,
} from 'src/admin/category-product/entities/category-product.entity';
import {
  Category,
  CategoryDocument,
} from 'src/admin/category/entities/category.entity';
import { ContactDocument } from 'src/admin/contact/entities/contact.entity';
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
import { CreateCommentDto } from '../comment/dto/create-comment.dto';
import { Comment, CommentDocument } from '../comment/entities/comment.entity';
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
    @InjectModel('Contact')
    private ContactModel: Model<ContactDocument>,
    @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
    @InjectModel(Blog.name) private BlogModel: Model<BlogDocument>,
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

    // top 3 new
    const productNew = await this.ProductModel.find().sort({ createdAt: -1 }).limit(3);

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

    // const query =  await this.removeVietnameseTones(q);
    const [products, cateProducts, slider] = await Promise.all([
      this.ProductModel.find({ name_search: { $regex: q, $options: 'i' } }).populate('promotion_id'),
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
      productNew
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
    }).sort({ createdAt: -1 }).limit(3);
 
    // top 3 new
    const productNew = await this.ProductModel.find().sort({ createdAt: -1 }).limit(3);

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
      productNew,
      totalPage,
      page,
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
    const findCate = await this.CategoryModel.findOne({ cate_slug: cate });
    const pageSize = 9;

    if (priceMin && priceMax) {
      // Lọc sản phẩm
      const arr = [];
      if (value !== undefined) {
        
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
      }).populate({ path: 'product_id', populate: 'promotion_id' }).limit(8),
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
    const comments = await this.CommentModel.find({ product_id: detail._id })
    return { detail, images, comments };
  }

  async comment(req: any, CreateCommentDto: CreateCommentDto) {
    const newComment = new this.CommentModel({
      content: CreateCommentDto.content,
      name: CreateCommentDto.name,
      email: CreateCommentDto.email,
      product_id: CreateCommentDto.product_id
    })
    return await newComment.save();
  }

  async policy() {
    return await this.PolicyModel.find();
  }
  async contact(){
    return await this.ContactModel.find();
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

  // chuyển có dấu thành không dấu
  async removeVietnameseTones(str: any) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}
}
