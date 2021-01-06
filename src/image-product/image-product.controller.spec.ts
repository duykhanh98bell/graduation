import { Test, TestingModule } from '@nestjs/testing';
import { ImageProductController } from './image-product.controller';
import { ImageProductService } from './image-product.service';

describe('ImageProductController', () => {
  let controller: ImageProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageProductController],
      providers: [ImageProductService],
    }).compile();

    controller = module.get<ImageProductController>(ImageProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
