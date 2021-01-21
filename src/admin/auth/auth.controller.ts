import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @Render('admin/login')
  login() {
    return;
  }

  @Post()
  async postLogin(
    @Body() LoginDto: LoginDto,
    @Req() req: any,
    @Res() res: any,
  ) {
    return await this.authService;
  }
}
