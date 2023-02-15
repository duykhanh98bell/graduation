/* eslint-disable @typescript-eslint/no-var-requires */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthDocument } from './entities/auth.entity';
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');

@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
    @InjectModel('User') private AuthModel: Model<AuthDocument>
  ) {}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async postLogin(loginDto: LoginDto, req: any, res: any) {
    const checkUser = await this.AuthModel.findOne({ email: loginDto.email });
    if (!checkUser) {
      req.session.message = {
        type: 'danger',
        message: 'Sai Email'
      };
      return res.redirect('back');
    }
    const checkPass = await bcrypt.compare(
      loginDto.password,
      checkUser.password
    );
    if (!checkPass) {
      req.session.message = {
        type: 'danger',
        message: 'Sai Pass'
      };
      return res.redirect('back');
    }
    const token = await this.jwtService.sign({ user: checkUser });
    if (loginDto.remember === 'on') {
      res.cookie('jwt', token);
      res.cookie('password', loginDto.password);
      res.cookie('remember', true);
    } else {
      res.clearCookie('jwt');
      res.clearCookie('password');
      res.clearCookie('remember');
      req.session.jwt = token;
    }
    return res.redirect('/product');
  }

  async example(email: string, pass: string): Promise<void> {
    await this.mailerService
      .sendMail({
        to: email, // list of receivers
        from: process.env.EMAIL, // sender address
        subject: 'Xác nhận tài khoản admin ✔', // Subject line
        text: 'welcome', // plaintext body
        html: `<b>Mật khẩu lần đầu đăng nhập: ${pass}</b>` // HTML body content
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async findUser(email) {
    return await this.AuthModel.findOne({ email: email });
  }

  async register(createAuthDto: CreateAuthDto, req: any, res: any) {
    const checkEmail = await this.findUser(createAuthDto.email);
    if (checkEmail) {
      req.session.message = {
        type: 'danger',
        message: 'Email đã được đăng kí'
      };
      return res.redirect('back');
    }
    // const randomPass = await randomstring.generate(7);
    // await this.example(createAuthDto.email, randomPass);
    if (createAuthDto.password !== createAuthDto.repassword) {
      req.session.message = {
        type: 'danger',
        message: 'Pass không trùng khớp'
      };
      return res.redirect('back');
    }
    const hashedRandomPass = await bcrypt.hash(createAuthDto.password, 12);
    await new this.AuthModel({
      name: createAuthDto.name,
      email: createAuthDto.email,
      password: hashedRandomPass
    }).save();
    req.session.message = {
      type: 'success',
      message: 'Đăng kí thành công'
    };
    return;
  }

  async forgot(updateAuth: UpdateAuthDto, req: any, res: any) {
    const checkUser = await this.findUser(updateAuth.email);
    if (!checkUser) {
      req.session.message = {
        type: 'danger',
        message: 'Email không tồn tại'
      };
      return res.redirect('back');
    }
    req.session.emailForgot = checkUser.email;
    const randomPass = await randomstring.generate(7);
    await this.example(updateAuth.email, randomPass);
    const hashedRandomPass = await bcrypt.hash(randomPass, 12);
    await this.AuthModel.findByIdAndUpdate(checkUser._id, {
      $set: {
        password: hashedRandomPass
      }
    });
    return;
  }

  async resetPass(updateAuthDto: UpdateAuthDto, req: any, res: any) {
    const checkUser = await this.findUser(updateAuthDto.email);

    const checkPass = await bcrypt.compare(
      updateAuthDto.forgotpass,
      checkUser.password
    );
    if (!checkPass) {
      req.session.message = {
        type: 'danger',
        message: 'Mã Không chính xác'
      };
      return res.redirect('back');
    }
    if (updateAuthDto.password !== updateAuthDto.repassword) {
      req.session.message = {
        type: 'danger',
        message: 'Mật khẩu không trùng khớp'
      };
      return res.redirect('back');
    }
    const hashedPass = await bcrypt.hash(updateAuthDto.password, 12);
    await this.AuthModel.findByIdAndUpdate(checkUser._id, {
      $set: {
        password: hashedPass
      }
    });
    req.session.message = {
      type: 'success',
      message: 'Đổi mật khẩu thành công'
    };
    return;
  }

  async logout(req, res) {
    if (req.cookies['remember']) {
      return;
    }
    res.clearCookie('jwt');
    res.clearCookie('password');
    res.clearCookie('remember');
    delete req.session.jwt;
  }
}
