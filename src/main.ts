import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // const flash = require('req-flash');
  // app.use(flash());

  // app.setViewEngine('hbs');
  app.setViewEngine('ejs');
  // app.setViewEngine('pug');
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(function (req: { session: any }, res: { locals: any }, next) {
    res.locals.totalCart = req.session.totalCart;
    res.locals.priceSale = req.session.priceSale;
    res.locals.percentSale = req.session.percentSale;
    res.locals.message = req.session.message;
    delete req.session.message;
    res.locals.total = req.session.total;
    res.locals.orderProducts = req.session.cart;
    next();
  });

  await app.listen(process.env.PORT);
}
bootstrap();
