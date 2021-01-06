import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact, ContactDocument } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private ContactModel: Model<ContactDocument>,
  ) {}

  create(createContactDto: CreateContactDto) {
    const con = new this.ContactModel({
      name: createContactDto.name,
      phone: createContactDto.phone,
      email: createContactDto.email,
      introduce: createContactDto.introduce,
    });
    con.save();
  }

  findAll() {
    return this.ContactModel.find();
  }

  findOne(id: string) {
    return this.ContactModel.findById(id);
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return this.ContactModel.findByIdAndUpdate(
      id,
      {
        name: updateContactDto.name,
        phone: updateContactDto.phone,
        email: updateContactDto.email,
        introduce: updateContactDto.introduce,
        updatedAt: new Date(),
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.ContactModel.findByIdAndRemove(id);
  }
}
