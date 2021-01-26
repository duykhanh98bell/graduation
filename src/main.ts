import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('ejs');

  app.use(cookieParser());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(function (req: any, res: any, next) {
    res.locals.totalCart = req.session.totalCart;
    res.locals.priceSale = req.session.priceSale;
    res.locals.percentSale = req.session.percentSale;
    res.locals.message = req.session.message;
    delete req.session.message;
    res.locals.total = req.session.total;
    res.locals.orderProducts = req.session.cart;
    res.locals.emailForgot = req.session.emailForgot;
    if (req.cookies['remember']) {
      res.locals.user = jwt.verify(
        req.cookies['jwt'],
        process.env.TOKEN_SECRET,
      );
      res.locals.password = req.cookies['password'];
      res.locals.remember = req.cookies['remember'];
    } else if (req.session.jwt) {
      res.locals.user = jwt.verify(req.session.jwt, process.env.TOKEN_SECRET);
    }
    next();
  });
  await app.listen(process.env.PORT);
}
bootstrap();
