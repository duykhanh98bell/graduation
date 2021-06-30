import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateValueDto } from './dto/create-value.dto';
import { UpdateValueDto } from './dto/update-value.dto';
import { Value, ValueDocument } from './entities/value.entity';
import {
  Attribute,
  AttributeDocument,
} from '../attribute/entities/attribute.entity';

@Injectable()
export class ValueService {
  constructor(
    @InjectModel('Value') private ValueModel: Model<ValueDocument>,
    @InjectModel('Attribute')
    private AttributeModel: Model<AttributeDocument>,
  ) {}
  async getAttribute() {
    return await this.AttributeModel.find();
  }
  async create(createValueDto: CreateValueDto) {
    const postValue = await this.ValueModel.create(createValueDto);
    return await postValue.save();
  }

  async findAll() {
    const values = await this.ValueModel.find().populate('attribute_id');
    return {
      values,
    };
  }

  findOne(id: string) {
    return this.ValueModel.findById(id);
  }

  async update(id: string, updateValueDto: UpdateValueDto) {
    await this.ValueModel.findByIdAndUpdate(
      id,
      {
        value: updateValueDto.value,
        code: updateValueDto.code,
        attribute_id: updateValueDto.attribute_id,
        updatedAt: new Date(),
      },
      { new: true },
    );
    return;
  }

  remove(id: string) {
    return this.ValueModel.findByIdAndRemove(id);
  }
}
