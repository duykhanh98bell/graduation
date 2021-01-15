import { Test, TestingModule } from '@nestjs/testing';
import { CategoryProductController } from './category-product.controller';
import { CategoryProductService } from './category-product.service';

describe('CategoryProductController', () => {
  let controller: CategoryProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryProductController],
      providers: [CategoryProductService],
    }).compile();

    controller = module.get<CategoryProductController>(CategoryProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
