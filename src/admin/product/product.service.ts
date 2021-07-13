import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import {
  Attribute,
  AttributeDocument
} from 'src/admin/attribute/entities/attribute.entity';
import { Brand, BrandDocument } from 'src/admin/brand/schemas/brand.schema';
import { CategoryProductDocument } from 'src/admin/category-product/entities/category-product.entity';
import {
  Category,
  CategoryDocument
} from 'src/admin/category/entities/category.entity';
// import { Trend, TrendDocument } from 'src/admin/trend/entities/trend.entity';
import {
  ValueProduct,
  ValueProductDocument
} from 'src/admin/value-product/entities/value-product.entity';
import { Value, ValueDocument } from 'src/admin/value/entities/value.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import fs = require('fs');
import { ImageProductDocument } from 'src/admin/image-product/entities/image-product.entity';
import { CreateImageProductDto } from './dto/create-image-product.dto';
import { VariantDocument } from 'src/admin/variant/entities/variant.entity';
import { CreateVariantDto } from 'src/admin/variant/dto/create-variant.dto';
import { VariantValueDocument } from 'src/admin/variant-value/entities/variant-value.entity';
import { UpdateVariantDto } from 'src/admin/variant/dto/update-variant.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
    // @InjectModel(Trend.name) private TrendModel: Model<TrendDocument>,
    @InjectModel(Brand.name) private BrandModel: Model<BrandDocument>,
    @InjectModel(Category.name) private CategoryModel: Model<CategoryDocument>,
    @InjectModel('Value') private ValueModel: Model<ValueDocument>,
    @InjectModel(Attribute.name)
    private AttributeModel: Model<AttributeDocument>,
    @InjectModel('ValueProduct')
    private ValueProductModel: Model<ValueProductDocument>,
    @InjectModel('CategoryProduct')
    private CategoryProductModel: Model<CategoryProductDocument>,
    @InjectModel('Image')
    private ImageProductModel: Model<ImageProductDocument>,
    @InjectModel('Variant')
    private VariantModel: Model<VariantDocument>,
    @InjectModel('VariantValue')
    private VariantValueModel: Model<VariantValueDocument>
  ) {}

  getBrand() {
    return this.BrandModel.find();
  }
  // getTrend() {
  //   return this.TrendModel.find();
  // }
  getCategory() {
    return this.CategoryModel.find();
  }
  getValue() {
    return this.ValueModel.find().populate('attribute_id');
  }
  getAttribute() {
    return this.AttributeModel.find();
  }

  async create(createProductDto: CreateProductDto, file: any) {
    const name_search = await this.removeVietnameseTones(createProductDto.name);
    const postProduct = new this.ProductModel({
      name: createProductDto.name,
      product_slug: slugify(createProductDto.name, { lower: true }),
      product_code: createProductDto.product_code,
      price: createProductDto.price,
      price_old: createProductDto.price_old,
      price_in: createProductDto.price_in,
      description: createProductDto.description,
      detail: createProductDto.detail,
      status: createProductDto.status,
      brand_id: createProductDto.brand_id,
      // trend_id: createProductDto.trend_id,
      value: createProductDto.value,
      image: file.filename,
      highlight: createProductDto.highlight,
      name_search
    });
    await postProduct.save();

    const checkProduct = await this.ProductModel.findOne({
      product_code: createProductDto.product_code
    });

    const imageFirst = new this.ImageProductModel({
      image: file.filename,
      product_id: checkProduct._id
    });
    await imageFirst.save();

    if (createProductDto.value !== undefined) {
      for (let index = 0; index < createProductDto.value.length; index++) {
        const element = createProductDto.value[index];
        const postProValue = new this.ValueProductModel({
          product_id: checkProduct._id,
          value_id: element
        });
        postProValue.save();
      }
    }
    if (createProductDto.category) {
      for (let index = 0; index < createProductDto.category.length; index++) {
        const element = createProductDto.category[index];
        const postProCategory = new this.CategoryProductModel({
          product_id: checkProduct._id,
          category_id: element
        });
        postProCategory.save();
      }
    }
  }

  async findAll() {
    const select = Promise.all([
      this.ProductModel.find().populate('brand_id').sort({ createdAt: -1 }),
      this.CategoryProductModel.find().populate('category_id').exec()
    ]).then(([products, categoryPros]) => {
      return { products, categoryPros };
    });
    return select;
  }

  async findOne(id: any) {
    const [
      product,
      categoryProduct,
      valueProduct,
      brands,
      // trends,
      categories,
      values,
      attributes
    ] = await Promise.all([
      this.ProductModel.findById(id),
      this.CategoryProductModel.find({ product_id: id }),
      this.ValueProductModel.find({ product_id: id }).populate('value_id'),
      this.BrandModel.find(),
      // this.TrendModel.find(),
      this.CategoryModel.find(),
      this.ValueModel.find(),
      this.AttributeModel.find()
    ]);
    return {
      product,
      categoryProduct,
      valueProduct,
      brands,
      // trends,
      categories,
      values,
      attributes
    };
  }

  async update(id: any, updateProductDto: UpdateProductDto, file: any) {
    const checkProduct = await this.ProductModel.findOne({
      _id: id
    });
    const name_search = await this.removeVietnameseTones(updateProductDto.name);
    if (file) {
      if (checkProduct.image !== null) {
        fs.unlinkSync('public/uploads/product/' + checkProduct.image);
      }
      await this.ProductModel.findByIdAndUpdate(id, {
        $set: {
          name: updateProductDto.name,
          product_slug: slugify(updateProductDto.name, { lower: true }),
          product_code: updateProductDto.product_code,
          price: +updateProductDto.price,
          price_old: +updateProductDto.price_old,
          price_in: +updateProductDto.price_in,
          description: updateProductDto.description,
          detail: updateProductDto.detail,
          status: updateProductDto.status,
          brand_id: updateProductDto.brand_id,
          // trend_id: updateProductDto.trend_id,
          value: updateProductDto.value,
          image: file.filename,
          highlight: updateProductDto.highlight,
          name_search
        }
      });

      const imageFirst = new this.ImageProductModel({
        image: file.filename,
        product_id: checkProduct._id
      });
      await imageFirst.save();
    } else {
      await this.ProductModel.findByIdAndUpdate(id, {
        $set: {
          name: updateProductDto.name,
          product_slug: slugify(updateProductDto.name, { lower: true }),
          product_code: updateProductDto.product_code,
          price: +updateProductDto.price,
          price_old: +updateProductDto.price_old,
          price_in: +updateProductDto.price_in,
          description: updateProductDto.description,
          detail: updateProductDto.detail,
          status: updateProductDto.status,
          brand_id: updateProductDto.brand_id,
          // trend_id: updateProductDto.trend_id,
          value: updateProductDto.value,
          highlight: updateProductDto.highlight,
          name_search
        }
      });
    }

    await Promise.all([
      this.CategoryProductModel.deleteMany({ product_id: id }),
      this.ValueProductModel.deleteMany({ product_id: id })
    ]);

    if (updateProductDto.value) {
      for (let index = 0; index < updateProductDto.value.length; index++) {
        const element = updateProductDto.value[index];
        const postProValue = new this.ValueProductModel({
          product_id: checkProduct._id,
          value_id: element
        });
        postProValue.save();
      }
    }
    if (updateProductDto.category) {
      for (let index = 0; index < updateProductDto.category.length; index++) {
        const element = updateProductDto.category[index];
        const postProCategory = new this.CategoryProductModel({
          product_id: checkProduct._id,
          category_id: element
        });
        postProCategory.save();
      }
    }
  }

  async remove(id: any) {
    const [checkProduct, checkImagePro] = await Promise.all([
      this.ProductModel.findOne({ _id: id }),
      this.ImageProductModel.find({ product_id: id })
    ]);
    if (fs.existsSync('public/uploads/product/' + checkProduct.image)) {
      fs.unlinkSync('public/uploads/product/' + checkProduct.image);
    }
    for (let index = 0; index < checkImagePro.length; index++) {
      const element = checkImagePro[index];
      if (fs.existsSync('public/uploads/product/' + element.image)) {
        fs.unlinkSync('public/uploads/product/' + element.image);
      }
    }
    await Promise.all([
      this.ImageProductModel.deleteMany({ product_id: id }),
      this.CategoryProductModel.deleteMany({ product_id: id }),
      this.ValueProductModel.deleteMany({ product_id: id }),
      this.ProductModel.deleteOne({ _id: id })
    ]);
  }

  getImage(id: any) {
    return this.ImageProductModel.find({ product_id: id });
  }

  async addImage(id: string, file: any) {
    const image = new this.ImageProductModel({
      image: file.filename,
      product_id: id
    });
    await image.save();
  }

  async editImage(id: string, file: any) {
    const checkImage = await this.ImageProductModel.findById(id);
    if (fs.existsSync('public/uploads/product/' + checkImage.image)) {
      fs.unlinkSync('public/uploads/product/' + checkImage.image);
    }
    await this.ImageProductModel.findByIdAndUpdate(id, {
      $set: {
        image: file.filename
      }
    });
  }

  async removeImage(id: string) {
    const checkImage = await this.ImageProductModel.findById(id);
    if (fs.existsSync('public/uploads/product/' + checkImage.image)) {
      fs.unlinkSync('public/uploads/product/' + checkImage.image);
    }
    await this.ImageProductModel.deleteOne({ _id: id });
  }

  async findValue(id: any) {
    const [values, attributes, variants, variantValues] = await Promise.all([
      this.ValueProductModel.find({ product_id: id }).populate('value_id'),
      this.AttributeModel.find(),
      this.VariantModel.find({ product_id: id }),
      this.VariantValueModel.find().populate('value_id')
    ]);
    return { values, attributes, variants, variantValues };
  }

  async createVariant(id: string, createVariantDto: CreateVariantDto) {
    const variant = await new this.VariantModel({
      quantity: createVariantDto.quantity,
      product_id: id
    }).save();
    for (let index = 0; index < createVariantDto.value_id.length; index++) {
      const element = createVariantDto.value_id[index];
      await new this.VariantValueModel({
        variant_id: variant._id,
        value_id: element
      }).save();
    }
  }

  async updateQuantity(id: string, updateVariantDto: UpdateVariantDto) {
    const variant = await this.VariantModel.findById(id);
    await this.VariantModel.findByIdAndUpdate(id, {
      $set: {
        quantity: variant.quantity + +updateVariantDto.quantity
      }
    });
  }

  async returnWH(id: string, updateVariantDto: UpdateVariantDto) {
    const variant = await this.VariantModel.findById(id);
    await this.VariantModel.findByIdAndUpdate(id, {
      $set: {
        quantity: variant.quantity + +updateVariantDto.quantity,
        sold: variant.sold - +updateVariantDto.quantity
      }
    });
  }

  async deleteVariant(id: any) {
    await Promise.all([
      this.VariantModel.deleteOne({ _id: id }),
      this.VariantValueModel.deleteMany({ variant_id: id })
    ]);
  }
  // chuyển có dấu thành không dấu
  async removeVietnameseTones(str: any) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      ' '
    );
    return str;
  }
}
