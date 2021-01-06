import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './entities/payment.entity';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [
    MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
  ],
})
export class PaymentModule {}
