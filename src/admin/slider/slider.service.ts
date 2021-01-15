import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { Slider, SliderDocument } from './entities/slider.entity';
import fs = require('fs');

@Injectable()
export class SliderService {
  constructor(
    @InjectModel(Slider.name) private SliderModel: Model<SliderDocument>,
  ) {}
  create(createSliderDto: CreateSliderDto, file: { filename: any }) {
    const postSlider = new this.SliderModel({
      name: createSliderDto.name,
      image: file.filename,
      active: createSliderDto.active,
    });
    return postSlider.save();
  }

  findAll() {
    return this.SliderModel.find();
  }

  findOne(id: string) {
    return this.SliderModel.findById(id);
  }

  async update(
    id: string,
    updateSliderDto: UpdateSliderDto,
    file: { filename: any },
  ) {
    if (file) {
      const findSlider = await this.findOne(id);
      fs.unlinkSync('public/uploads/slider/' + findSlider.image);
      await this.SliderModel.findByIdAndUpdate(id, {
        name: updateSliderDto.name,
        image: file.filename,
        active: updateSliderDto.active,
      });
    } else {
      await this.SliderModel.findByIdAndUpdate(id, {
        $set: {
          name: updateSliderDto.name,
          active: updateSliderDto.active,
        },
      });
    }
  }

  async remove(id: string) {
    const findSlider = await this.findOne(id);
    fs.unlinkSync('public/uploads/slider/' + findSlider.image);
    return this.SliderModel.findByIdAndRemove(id);
  }

  async toggleActive(id: string) {
    const check = await this.findOne(id);
    await this.SliderModel.findByIdAndUpdate(id, {
      $set: {
        active: !check.active,
      },
    });
  }
}
