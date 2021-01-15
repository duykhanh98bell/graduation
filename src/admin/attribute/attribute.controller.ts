import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
  Render,
  Redirect,
} from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Get('/create')
  @Render('admin/partials/attribute/create')
  async getCreate() {
    return { pageName: 'Thêm mới thuộc tính', title: 'Thuộc tính' };
  }

  @Post('/create')
  @Redirect('/attribute/')
  create(@Body() createAttributeDto: CreateAttributeDto, @Res() res) {
    return this.attributeService.create(createAttributeDto);
  }

  @Get()
  @Render('admin/partials/attribute/read')
  async findAll(@Res() res) {
    const findAllAttr = await this.attributeService.findAll();
    if (!findAllAttr) throw new NotFoundException('Khong thay thuoc tinh nao');
    return {
      findAllAttr,
      pageName: 'Danh sách thuộc tính',
      title: 'Thuộc tính',
    };
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    const findOneAttr = await this.attributeService.findOne(id);
    if (!findOneAttr) throw new NotFoundException('Thuoc tinh khong ton tai');
    return res.json(findOneAttr);
  }

  @Get('/update/:id')
  @Render('admin/partials/attribute/update')
  async getUpdate(@Param('id') id) {
    const getUpdate = await this.attributeService.findOne(id);
    return { getUpdate, title: 'Thuộc tính', pageName: 'Sửa thuộc tính' };
  }

  @Post('/update/:id')
  @Redirect('/attribute/')
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    const updateAttr = await this.attributeService.update(
      id,
      updateAttributeDto,
    );
    return;
  }

  @Get('/delete/:id')
  @Redirect('/attribute/')
  async remove(@Res() res, @Param('id') id: string) {
    const deleteAttr = await this.attributeService.remove(id);
    return;
  }
}
