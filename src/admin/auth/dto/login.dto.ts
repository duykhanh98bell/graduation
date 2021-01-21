/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Tên tài khoản không được để trống' })
  @Length(8, 25, { message: 'Tên tài khoản từ 8 - 25 kí tự' })
  username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Length(6, 25, { message: 'Mật khẩu từ 6 - 25 kí tự' })
  password: string;
}
