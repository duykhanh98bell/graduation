import { Test, TestingModule } from '@nestjs/testing';
import { ValueProductController } from './value-product.controller';
import { ValueProductService } from './value-product.service';

describe('ValueProductController', () => {
  let controller: ValueProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValueProductController],
      providers: [ValueProductService],
    }).compile();

    controller = module.get<ValueProductController>(ValueProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
