import { Test, TestingModule } from '@nestjs/testing';
import { VariantValueController } from './variant-value.controller';
import { VariantValueService } from './variant-value.service';

describe('VariantValueController', () => {
  let controller: VariantValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariantValueController],
      providers: [VariantValueService],
    }).compile();

    controller = module.get<VariantValueController>(VariantValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
