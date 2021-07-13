/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../product/entities/product.entity';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion, PromotionDocument } from './entities/promotion.entity';
const moment = require('moment');

@Injectable()
export class PromotionService {
  constructor(
    @InjectModel(Promotion.name)
    private PromotionModel: Model<PromotionDocument>,
    @InjectModel(Product.name)
    private ProductModel: Model<ProductDocument>
  ) {}

  async listProduct() {
    return await this.ProductModel.find({
      $or: [{ promotion_active: false }, { promotion_active: undefined }]
    });
  }

  async listProductUpdate(id: any) {
    return await this.ProductModel.find({
      $or: [
        { promotion_active: false },
        { promotion_active: undefined },
        { promotion_id: id }
      ]
    });
  }

  async create(createPromotionDto: CreatePromotionDto, res: any) {
    const valueTime = Date.now();
    const start = await new Date(createPromotionDto.start_date).valueOf();
    const end = await new Date(createPromotionDto.end_date).valueOf();

    if (start < valueTime) {
      return res.redirect('back');
    }
    if (start > end) {
      return res.redirect('back');
    }
    createPromotionDto.start_date = moment(
      createPromotionDto.start_date
    ).startOf('day');
    createPromotionDto.end_date = moment(createPromotionDto.end_date).endOf(
      'day'
    );
    const postPromotion = new this.PromotionModel(createPromotionDto);
    const getPromotion = await postPromotion.save();

    if (createPromotionDto.product_id) {
      for (const index in createPromotionDto.product_id) {
        const element = createPromotionDto.product_id[index];
        const setPromotionProduct = await this.ProductModel.findByIdAndUpdate(
          element,
          {
            $set: {
              promotion_id: getPromotion._id,
              promotion_active: true
            }
          }
        );
      }
    }

    return;
  }

  async findAll() {
    const list = await this.PromotionModel.find();
    return list;
  }

  async findOne(id: string) {
    const findPromotion = await this.PromotionModel.findById(id);
    const products = [];
    if (findPromotion.product_id) {
      for (const index in findPromotion.product_id) {
        const element = await findPromotion.product_id[index];
        const product = await this.ProductModel.find({
          _id: element,
          promotion_active: true
        });
        products.push(product);
      }
    }
    return { findPromotion, products };
  }

  async postUpdate(id: any, updatePromotionDto: UpdatePromotionDto, res: any) {
    const findProducts = await this.ProductModel.find({ promotion_id: id });
    if (findProducts.length) {
      for (const index in findProducts) {
        if (Object.prototype.hasOwnProperty.call(findProducts, index)) {
          const element = findProducts[index];
          const product = await this.ProductModel.findByIdAndUpdate(
            { _id: element._id },
            {
              $set: {
                promotion_active: false
              }
            }
          );
        }
      }
    }

    if (
      updatePromotionDto.start_date &&
      updatePromotionDto.end_date &&
      updatePromotionDto.product_id
    ) {
      const valueTime = Date.now();
      const start = await new Date(updatePromotionDto.start_date).valueOf();
      const end = await new Date(updatePromotionDto.end_date).valueOf();

      if (start < valueTime) {
        return res.redirect('back');
      }
      if (start > end) {
        return res.redirect('back');
      }
      const postPromotion = await this.PromotionModel.findByIdAndUpdate(id, {
        $set: {
          name: updatePromotionDto.name,
          percent: updatePromotionDto.percent,
          start_date: moment(updatePromotionDto.start_date).startOf('day'),
          end_date: moment(updatePromotionDto.end_date).endOf('day'),
          product_id: updatePromotionDto.product_id
        }
      });
      for (const index in updatePromotionDto.product_id) {
        const element = updatePromotionDto.product_id[index];
        const setPromotionProduct = await this.ProductModel.findByIdAndUpdate(
          element,
          {
            $set: {
              promotion_id: id,
              promotion_active: true
            }
          }
        );
      }
    } else if (
      updatePromotionDto.start_date &&
      updatePromotionDto.end_date &&
      !updatePromotionDto.product_id
    ) {
      const time = Date.now();
      const valueTime = time.valueOf();
      if (updatePromotionDto.start_date.valueOf() < valueTime) {
        return res.redirect('back');
      }
      if (
        updatePromotionDto.start_date.valueOf() >
        updatePromotionDto.end_date.valueOf()
      ) {
        return res.redirect('back');
      }
      const postPromotion = await this.PromotionModel.findByIdAndUpdate(id, {
        $set: {
          name: updatePromotionDto.name,
          percent: updatePromotionDto.percent,
          start_date: moment(updatePromotionDto.start_date).startOf('day'),
          end_date: moment(updatePromotionDto.end_date).endOf('day'),
          product_id: updatePromotionDto.product_id
        }
      });
    } else if (
      !updatePromotionDto.start_date &&
      !updatePromotionDto.end_date &&
      updatePromotionDto.product_id
    ) {
      const postPromotion = await this.PromotionModel.findByIdAndUpdate(id, {
        $set: {
          name: updatePromotionDto.name,
          percent: updatePromotionDto.percent,
          product_id: updatePromotionDto.product_id
        }
      });
      for (const index in updatePromotionDto.product_id) {
        const element = updatePromotionDto.product_id[index];
        const setPromotionProduct = await this.ProductModel.findByIdAndUpdate(
          element,
          {
            $set: {
              promotion_id: id,
              promotion_active: true
            }
          }
        );
      }
    }
    return;
  }

  async detail(id: string) {
    const findPromotion = await this.PromotionModel.findById(id);
    const products = [];
    if (findPromotion.product_id) {
      for (const index in findPromotion.product_id) {
        const element = await findPromotion.product_id[index];
        const product = await this.ProductModel.find({
          _id: element,
          promotion_active: true
        });
        products.push(product);
      }
    }
    return { findPromotion, products };
  }

  async remove(id: any) {
    const findProducts = await this.ProductModel.find({ promotion_id: id });
    if (findProducts.length) {
      for (const index in findProducts) {
        if (Object.prototype.hasOwnProperty.call(findProducts, index)) {
          const element = findProducts[index];
          const product = await this.ProductModel.findByIdAndUpdate(
            { _id: element._id },
            {
              $set: {
                promotion_active: false
              }
            }
          );
        }
      }
    }
    await this.PromotionModel.findByIdAndRemove(id);
    return;
  }
}
