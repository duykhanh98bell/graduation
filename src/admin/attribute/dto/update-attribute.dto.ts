import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty, IsNotEmpty } from 'class-validator';
import { CreateAttributeDto } from './create-attribute.dto';

export class UpdateAttributeDto extends PartialType(CreateAttributeDto) {
  @IsNotEmpty({
    message: 'Tên thuộc tính không được để trống',
  })
  name: string;
}
