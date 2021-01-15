import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment, PaymentDocument } from './entities/payment.entity';
import path = require('path');
import fs = require('fs');

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel('Payment') private PaymentModel: Model<PaymentDocument>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto, file) {
    const postPayment = await new this.PaymentModel({
      name: createPaymentDto.name,
      logo: file.filename,
    });
    await postPayment.save();
    return;
  }

  findAll() {
    return this.PaymentModel.find();
  }

  findOne(id: string) {
    return this.PaymentModel.findById(id);
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto, file: any) {
    // Delete image and update image
    if (file) {
      const photo = await this.PaymentModel.findById(id);
      fs.unlinkSync(path.resolve('public/uploads/payment/' + photo.logo));
      await this.PaymentModel.findByIdAndUpdate(id, {
        $set: {
          name: updatePaymentDto.name,
          logo: file.filename,
          updatedAt: new Date(),
        },
      });
    } else {
      await this.PaymentModel.findByIdAndUpdate(id, {
        $set: {
          name: updatePaymentDto.name,
          updatedAt: new Date(),
        },
      });
    }
  }

  async remove(id: string) {
    const photo = await this.PaymentModel.findByIdAndRemove(id);
    fs.unlinkSync(path.resolve('public/uploads/payment/' + photo.logo));
    return;
  }
}
