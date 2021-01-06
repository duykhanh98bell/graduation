import { Injectable } from '@nestjs/common';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Ship, ShipDocument } from './entities/ship.entity';
import path = require('path');
import fs = require('fs');

@Injectable()
export class ShipService {
  constructor(@InjectModel('Ship') private ShipModel: Model<ShipDocument>) {}

  async create(createShipDto: CreateShipDto, file: { filename: any }) {
    const ship = new this.ShipModel({
      name: createShipDto.name,
      price: createShipDto.price,
      logo: file.filename,
    });
    await ship.save();
    return;
  }

  async checkShip(createShipDto: CreateShipDto) {
    const checkShip = await this.ShipModel.find({ name: createShipDto.name });
    if (!checkShip) return 0;
    return 1;
  }

  findAll() {
    return this.ShipModel.find();
  }

  findOne(id: string) {
    return this.ShipModel.findById(id);
  }

  async update(
    id: string,
    updateShipDto: UpdateShipDto,
    file: { filename: any },
  ) {
    // Delete image and update image
    if (file) {
      const photo = await this.ShipModel.findById(id);
      fs.unlinkSync(path.resolve('public/uploads/ship/' + photo.logo));
      await this.ShipModel.findByIdAndUpdate(id, {
        $set: {
          name: updateShipDto.name,
          price: updateShipDto.price,
          logo: file.filename,
          updatedAt: new Date(),
        },
      });
    } else {
      await this.ShipModel.findByIdAndUpdate(id, {
        $set: {
          name: updateShipDto.name,
          price: updateShipDto.price,
          updatedAt: new Date(),
        },
      });
    }

    return;
  }

  async remove(id: string) {
    const photo = await this.ShipModel.findByIdAndDelete(id);
    if (photo.logo) {
      await fs.unlinkSync(path.resolve('public/uploads/ship/' + photo.logo));
    }
    return;
  }
}
