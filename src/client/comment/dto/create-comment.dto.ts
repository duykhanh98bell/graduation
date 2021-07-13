import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';
import { Attribute } from 'src/admin/attribute/entities/attribute.entity';
import { Product } from 'src/admin/product/entities/product.entity';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'Tên giá trị không được trống' })
  content: string;

  @IsNotEmpty()
  name: string;

  email: string;
  product_id: Product;
}
