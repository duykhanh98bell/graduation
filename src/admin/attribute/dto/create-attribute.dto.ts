import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateAttributeDto {
  @IsNotEmpty({
    message: 'Tên thuộc tính không được để trống ',
  })
  name: string;
}
