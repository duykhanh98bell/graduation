import { Test, TestingModule } from '@nestjs/testing';
import { ProductBackController } from './product-back.controller';
import { ProductBackService } from './product-back.service';

describe('ProductBackController', () => {
  let controller: ProductBackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductBackController],
      providers: [ProductBackService],
    }).compile();

    controller = module.get<ProductBackController>(ProductBackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
