import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';
import fs = require('fs');

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CategoryModel: Model<CategoryDocument>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    req: any,
    file: { filename: any },
  ) {
    if (req.body.parent_id === 'none') {
      const category = new this.CategoryModel({
        name: createCategoryDto.name,
        cate_slug: slugify(createCategoryDto.name, {
          replacement: '-',
          remove: undefined,
          lower: true,
          strict: false,
          locale: 'vi',
        }),
        avatar: file.filename,
        nav_active: createCategoryDto.nav_active,
      });
      await category.save();
    } else {
      const category = new this.CategoryModel({
        name: createCategoryDto.name,
        parent_id: createCategoryDto.parent_id,
        cate_slug: slugify(createCategoryDto.name, {
          replacement: '-',
          remove: undefined,
          lower: true,
          strict: false,
          locale: 'vi',
        }),
        avatar: file.filename,
        nav_active: createCategoryDto.nav_active,
      });
      await category.save();
    }
  }

  findAll() {
    return this.CategoryModel.find();
  }
  findParent() {
    return this.CategoryModel.find().populate('parent_id');
  }

  findOne(id: string) {
    return this.CategoryModel.findById(id).populate('parent_id');
  }

  async toggleNav(id: string) {
    const check = await this.CategoryModel.findById(id);
    await this.CategoryModel.findByIdAndUpdate(id, {
      $set: {
        nav_active: !check.nav_active,
      },
    });
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    file: any,
    req: any,
  ) {
    if (req.body.parent_id === 'none') {
      if (file) {
        // console.log('none co file');
        // console.log(updateCategoryDto, file);

        const checkImage = await this.CategoryModel.findById(id);
        fs.unlinkSync('public/uploads/category/' + checkImage.avatar);
        await this.CategoryModel.findByIdAndUpdate(id, {
          $set: {
            name: updateCategoryDto.name,
            cate_slug: slugify(updateCategoryDto.name, {
              replacement: '-',
              remove: undefined,
              lower: true,
              strict: false,
              locale: 'vi',
            }),
            avatar: file.filename,
            nav_active: updateCategoryDto.nav_active,
          },
        });
      } else {
        // console.log('none k file');
        // console.log(updateCategoryDto);
        await this.CategoryModel.findByIdAndUpdate(id, {
          $set: {
            name: updateCategoryDto.name,
            cate_slug: slugify(updateCategoryDto.name, {
              replacement: '-', // replace spaces with replacement character, defaults to `-`
              remove: undefined, // remove characters that match regex, defaults to `undefined`
              lower: true, // convert to lower case, defaults to `false`
              strict: false, // strip special characters except replacement, defaults to `false`
              locale: 'vi', // language code of the locale to use
            }),
            nav_active: updateCategoryDto.nav_active,
          },
        });
      }
    } else if (req.body.parent_id !== 'none') {
      if (file) {
        // console.log('k none co file');
        // console.log(updateCategoryDto, file);
        const checkImage = await this.CategoryModel.findById(id);
        fs.unlinkSync('public/uploads/category/' + checkImage.avatar);
        await this.CategoryModel.findByIdAndUpdate(id, {
          $set: {
            name: updateCategoryDto.name,
            parent_id: updateCategoryDto.parent_id,
            cate_slug: slugify(updateCategoryDto.name, {
              replacement: '-',
              remove: undefined,
              lower: true,
              strict: false,
              locale: 'vi',
            }),
            avatar: file.filename,
            nav_active: updateCategoryDto.nav_active,
          },
        });
      } else {
        // console.log('k none k file');
        // console.log(updateCategoryDto);
        await this.CategoryModel.findByIdAndUpdate(id, {
          $set: {
            name: updateCategoryDto.name,
            parent_id: updateCategoryDto.parent_id,
            cate_slug: slugify(updateCategoryDto.name, {
              replacement: '-', // replace spaces with replacement character, defaults to `-`
              remove: undefined, // remove characters that match regex, defaults to `undefined`
              lower: true, // convert to lower case, defaults to `false`
              strict: false, // strip special characters except replacement, defaults to `false`
              locale: 'vi', // language code of the locale to use
            }),
            nav_active: updateCategoryDto.nav_active,
          },
        });
      }
    }
  }

  async remove(id: string) {
    const checkImage = await this.CategoryModel.findById(id);
    fs.unlinkSync('public/uploads/category/' + checkImage.avatar);
    return await this.CategoryModel.findByIdAndRemove(id);
  }
}
