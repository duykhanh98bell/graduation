import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Policy, PolicySchema } from './entities/policy.entity';

@Module({
  controllers: [PolicyController],
  providers: [PolicyService],
  imports: [
    MongooseModule.forFeature([{ name: Policy.name, schema: PolicySchema }]),
  ],
})
export class PolicyModule {}
