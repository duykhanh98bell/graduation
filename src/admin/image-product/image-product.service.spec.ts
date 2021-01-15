import { Test, TestingModule } from '@nestjs/testing';
import { ImageProductService } from './image-product.service';

describe('ImageProductService', () => {
  let service: ImageProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageProductService],
    }).compile();

    service = module.get<ImageProductService>(ImageProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
