/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const cookieExtractor = function (req: any) {
      let token = null;
      if (req.cookies['jwt']) {
        token = req.cookies['jwt'];
      } else {
        token = req.session.jwt;
      }
      return token;
    };
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    return { ...payload.user };
  }
}
