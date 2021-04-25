import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { Policy, PolicyDocument } from './entities/policy.entity';

@Injectable()
export class PolicyService {
  constructor(
    @InjectModel(Policy.name) private PolicyModel: Model<PolicyDocument>,
  ) {}

  // async create(createPolicyDto: CreatePolicyDto): Promise<PolicyDocument> {
  //   const createdPolicy = new this.PolicyModel({
  //     content: createPolicyDto.content,
  //   });
  //   return await createdPolicy.save();
  // }

  async findAll(): Promise<PolicyDocument[]> {
    return await this.PolicyModel.find();
  }

  async findOne(id: string) {
    return await this.PolicyModel.findOne({ _id: id });
  }

  async update(id: string, updatePolicyDto: UpdatePolicyDto) {
    return await this.PolicyModel.findByIdAndUpdate(id, updatePolicyDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} policy`;
  // }
}
