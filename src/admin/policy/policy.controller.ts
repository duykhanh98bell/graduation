import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Render,
  Redirect,
  UseFilters,
} from '@nestjs/common';
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ViewAuthFilter } from '../http-exception/http-exception.filter';

@UseGuards(JwtAuthGuard)
@UseFilters(ViewAuthFilter)
@Controller('policy')
@UsePipes(new ValidationPipe())
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Get('create')
  @Render('admin/partials/policy/create')
  async getCreate() {
    return { title: 'Policy', pageName: 'Policy' };
  }

  // @Post('create')
  // @Redirect('/policy/')
  // create(@Body() createPolicyDto: CreatePolicyDto) {
  //   return;
  // }

  @Get()
  @Render('admin/partials/policy/read')
  async findAll() {
    const content = await this.policyService.findAll();
    return { title: 'Policy', pageName: 'Policy', content };
  }

  @Get('/update/:id')
  @Render('admin/partials/policy/update')
  async getUpdate(@Param('id') id: string) {
    const getPolicy = await this.policyService.findOne(id);
    return { title: 'Policy', pageName: 'Policy', getPolicy };
  }

  @Post('/update/:id')
  @Redirect('/policy/')
  update(@Param('id') id: string, @Body() updatePolicyDto: UpdatePolicyDto) {
    return this.policyService.update(id, updatePolicyDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.policyService.remove(+id);
  // }
}
