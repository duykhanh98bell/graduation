import { Test, TestingModule } from '@nestjs/testing';
import { VariantValueService } from './variant-value.service';

describe('VariantValueService', () => {
  let service: VariantValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariantValueService],
    }).compile();

    service = module.get<VariantValueService>(VariantValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
