import { Test, TestingModule } from '@nestjs/testing';
import { BlogCategoryService } from './blog-category.service';

describe('BlogCategoryService', () => {
  let service: BlogCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogCategoryService],
    }).compile();

    service = module.get<BlogCategoryService>(BlogCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
