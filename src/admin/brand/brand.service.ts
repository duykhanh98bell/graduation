import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Brand, BrandDocument } from './schemas/brand.schema';
import { CreateBrandDTO } from './dtos/create-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private BrandModel: Model<BrandDocument>,
  ) {}

  async create(createBrandDTO: CreateBrandDTO): Promise<BrandDocument> {
    const createBrand = new this.BrandModel(createBrandDTO);
    return await createBrand.save();
  }

  async findAll(): Promise<BrandDocument[]> {
    return await this.BrandModel.find();
  }

  async findOne(id: string): Promise<BrandDocument> {
    return await this.BrandModel.findOne({ _id: id });
  }

  async updateBrand(id: string, createBrandDTO): Promise<BrandDocument> {
    return await this.BrandModel.findByIdAndUpdate(id, createBrandDTO, {
      new: true,
    });
  }

  async deleteBrand(id: string) {
    return await this.BrandModel.findByIdAndDelete(id);
  }
}
