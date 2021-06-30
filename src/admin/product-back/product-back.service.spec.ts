import { Test, TestingModule } from '@nestjs/testing';
import { ProductBackService } from './product-back.service';

describe('ProductBackService', () => {
  let service: ProductBackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductBackService],
    }).compile();

    service = module.get<ProductBackService>(ProductBackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
