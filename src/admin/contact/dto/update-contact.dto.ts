import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  name: string;
  email: string;
  phone: string;
  introduce: string;
  createdAt?: Date;
  updatedAt?: Date;
}
