import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { CustomerService } from './customer.service';

@Module({
  controllers: [CustomerController],
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  providers: [CustomerService],
})
export class CustomerModule {}
