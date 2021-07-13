import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact, ContactDocument } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private ContactModel: Model<ContactDocument>
  ) {}

  async create(createContactDto: CreateContactDto) {
    return await this.ContactModel.create(createContactDto);
  }

  async findAll() {
    return await this.ContactModel.find();
  }

  findOne(id: string) {
    return this.ContactModel.findById(id);
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    return await this.ContactModel.findByIdAndUpdate(id, updateContactDto);
  }

  remove(id: string) {
    return this.ContactModel.findByIdAndRemove(id);
  }
}
