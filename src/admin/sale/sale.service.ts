import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale, SaleDocument } from './entities/sale.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomstring = require('randomstring');

@Injectable()
export class SaleService {
  constructor(@InjectModel(Sale.name) private SaleModel: Model<SaleDocument>) {}

  async create(createSaleDto: CreateSaleDto) {
    const addSale = await new this.SaleModel({
      name: createSaleDto.name,
      code: randomstring.generate(7),
      percent: createSaleDto.percent,
    }).save();
    return;
  }

  async findAll() {
    return await this.SaleModel.find();
  }

  async findOne(id: string) {
    return await this.SaleModel.findById(id);
  }

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    return await this.SaleModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: updateSaleDto.name,
          percent: updateSaleDto.percent,
        },
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.SaleModel.findByIdAndDelete(id);
  }
}
