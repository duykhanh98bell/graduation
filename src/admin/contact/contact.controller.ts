import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Render,
  Redirect
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('create')
  @Render('admin/partials/contact/create')
  async getCreate() {
    return {
      pageName: 'Liên hệ',
      title: 'Liên hệ'
    };
  }

  @Post('create')
  @Redirect('/contact')
  async create(@Body() createContactDto: CreateContactDto) {
    await this.contactService.create(createContactDto);
    return;
  }

  @Get()
  @Render('admin/partials/contact/read')
  async findAll() {
    const contact = await this.contactService.findAll();
    return {
      pageName: 'Liên hệ',
      contact,
      title: 'Liên hệ'
    };
  }

  @Get('update/:id')
  @Render('admin/partials/contact/update')
  async findOne(@Param('id') id: string) {
    const contact = await this.contactService.findOne(id);
    return {
      pageName: 'Liên hệ',
      contact,
      title: 'Liên hệ'
    };
  }

  @Post('update/:id')
  @Redirect('/contact')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
