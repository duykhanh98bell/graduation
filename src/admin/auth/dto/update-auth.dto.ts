import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsNotEmpty({ message: 'Tên admin không được để trống' })
  @Length(8, 25, { message: 'Tên tài khoản từ 8 - 25 kí tự' })
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Length(6, 25, { message: 'Mật khẩu từ 6 - 25 kí tự' })
  forgotpass: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Length(6, 25, { message: 'Mật khẩu từ 6 - 25 kí tự' })
  password: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Length(6, 25, { message: 'Mật khẩu từ 6 - 25 kí tự' })
  repassword: string;
}
