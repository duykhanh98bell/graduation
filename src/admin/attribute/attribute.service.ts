import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Attribute, AttributeDocument } from './entities/attribute.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectModel(Attribute.name)
    private AttributeModel: Model<AttributeDocument>,
  ) {}
  create(createAttributeDto: CreateAttributeDto) {
    return this.AttributeModel.create(createAttributeDto);
  }

  async findAll() {
    return await this.AttributeModel.find();
  }

  async findOne(id: string) {
    return await this.AttributeModel.findById(id);
  }

  async update(id: string, updateAttributeDto: UpdateAttributeDto) {
    return await this.AttributeModel.updateOne(
      { _id: id },
      {
        $set: {
          name: updateAttributeDto.name,
        },
      },
      { new: true },
    );
  }

  remove(id: string) {
    return this.AttributeModel.findByIdAndDelete(id);
  }
}
