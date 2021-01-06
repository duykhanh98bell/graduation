import { Body, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private CustomerModel: Model<CustomerDocument>,
  ) {}
  async create(@Body() payload) {
    const customerNew = new this.CustomerModel(payload);
    return await customerNew.save();
  }
  async getAll() {
    return this.CustomerModel.find();
  }
  async getOne(id) {
    return this.CustomerModel.findById(id);
  }
  async updateOneCustomer(id, payload) {
    const updateOneCus = await this.CustomerModel.updateOne(
      { _id: id },
      {
        $set: {
          customer_name: payload.customer_name,
          phone: payload.phone,
          email: payload.email,
          address: payload.address,
          updatedAt: new Date(),
        },
      },
      { new: true },
    );
    return updateOneCus;
  }
  async deleteOneCustomer(id) {
    const deleteOne = await this.CustomerModel.findByIdAndDelete(id);
    return deleteOne;
  }
}
