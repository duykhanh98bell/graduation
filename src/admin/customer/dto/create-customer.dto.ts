import { IsEmail, IsNotEmpty, Length, Max, Min } from 'class-validator';

export class CreateCustomerDto {
  @Length(5, 25, { message: 'Tên từ 5 - 25 kí tự' })
  @IsNotEmpty({ message: 'Ten khong duoc de trong' })
  name: string;

  @IsNotEmpty({ message: 'So dien thoai khong duoc de trong' })
  @Length(10, 10, { message: 'Số điện thoại 10 số' })
  phone: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email khong duoc de trong' })
  email: string;
}
