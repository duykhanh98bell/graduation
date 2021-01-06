import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import path from 'path';
import { stringify } from 'uuid';
import { CreateTrendDto } from './dto/create-trend.dto';
import { UpdateTrendDto } from './dto/update-trend.dto';
import { Trend, TrendDocument } from './entities/trend.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const slugify = require('slugify');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

@Injectable()
export class TrendService {
  constructor(
    @InjectModel(Trend.name) private TrendModel: Model<TrendDocument>,
  ) {}

  async create(createTrendDto: CreateTrendDto, file: { filename: any }) {
    const newTrend = new this.TrendModel({
      name: createTrendDto.name,
      slug: slugify(createTrendDto.name, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: false,
        locale: 'vi',
      }),
      avatar: file.filename,
      active: createTrendDto.active,
      nav_active: createTrendDto.nav_active,
    });
    await newTrend.save();
  }

  findAll() {
    return this.TrendModel.find();
  }

  findOne(id: string) {
    return this.TrendModel.findById(id);
  }

  async update(
    id: string,
    updateTrendDto: UpdateTrendDto,
    file: { filename: any },
  ) {
    const findRemove = await this.TrendModel.findById(id);
    if (findRemove.avatar != '') {
      fs.unlinkSync('public/uploads/trend/' + findRemove.avatar);
    }
    await this.TrendModel.findByIdAndUpdate(
      id,
      {
        name: updateTrendDto.name,
        slug: slugify(updateTrendDto.name, {
          replacement: '-',
          remove: undefined,
          lower: true,
          strict: false,
          locale: 'vi',
        }),
        avatar: file.filename,
        active: updateTrendDto.active,
        nav_active: updateTrendDto.nav_active,
        updatedAt: new Date(),
      },
      { new: true },
    );
  }

  async remove(id: string) {
    const deleteTrend = await this.TrendModel.findByIdAndRemove(id);
    if (deleteTrend.avatar) {
      fs.unlinkSync('public/uploads/trend/' + deleteTrend.avatar);
    }
  }

  async toggle(id: string) {
    const check = await this.findOne(id);
    await this.TrendModel.findByIdAndUpdate(
      id,
      {
        $set: {
          active: !check.active,
        },
      },
      { new: true },
    );
  }

  async toggleNav(id: string) {
    const check = await this.findOne(id);
    await this.TrendModel.findByIdAndUpdate(
      id,
      {
        $set: {
          nav_active: !check.nav_active,
        },
      },
      { new: true },
    );
  }
}
