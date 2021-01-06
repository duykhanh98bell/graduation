import { Test, TestingModule } from '@nestjs/testing';
import { ValueProductService } from './value-product.service';

describe('ValueProductService', () => {
  let service: ValueProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValueProductService],
    }).compile();

    service = module.get<ValueProductService>(ValueProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
