import { Module } from '@nestjs/common';
import { BlogCategoryController } from './blog-category.controller';

@Module({
  controllers: [BlogCategoryController]
})
export class BlogCategoryModule {}
