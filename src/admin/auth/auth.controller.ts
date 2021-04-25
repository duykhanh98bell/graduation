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
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @Render('admin/partials/auth/login')
  login(@Res() res) {
    return;
  }

  @Post()
  async postLogin(
    @Body() LoginDto: LoginDto,
    @Req() req: any,
    @Res() res: any,
  ) {
    return await this.authService.postLogin(LoginDto, req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('register')
  @Render('admin/partials/auth/register')
  async register() {
    return await this.authService;
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  @Redirect('/auth')
  async postRegister(
    @Body() CreateAuthDto: CreateAuthDto,
    @Req() req: any,
    @Res() res: any,
  ) {
    return await this.authService.register(CreateAuthDto, req, res);
  }

  @Get('forgot')
  @Render('admin/partials/auth/forgot')
  async getForgot(
    @Body() UpdateAuthDto: UpdateAuthDto,
    @Req() req: any,
    @Res() res: any,
  ) {
    return;
  }

  @Post('forgot')
  @Redirect('/auth/reset')
  async forgot(
    @Body() UpdateAuthDto: UpdateAuthDto,
    @Req() req: any,
    @Res() res: any,
  ) {
    return await this.authService.forgot(UpdateAuthDto, req, res);
  }

  @Get('reset')
  @Render('admin/partials/auth/reset')
  async getReset() {
    return;
  }

  @Post('reset')
  @Redirect('/auth')
  async postReset(
    @Body() UpdateAuthDto: UpdateAuthDto,
    @Req() req: any,
    @Res() res: any,
  ) {
    return await this.authService.resetPass(UpdateAuthDto, req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @Redirect('/auth')
  async logout(@Req() req, @Res() res) {
    return await this.authService.logout(req, res);
  }
}
