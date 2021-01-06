import { Test, TestingModule } from '@nestjs/testing';
import { BlogCategoryController } from './blog-category.controller';

describe('BlogCategoryController', () => {
  let controller: BlogCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogCategoryController],
    }).compile();

    controller = module.get<BlogCategoryController>(BlogCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
