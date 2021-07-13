import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Render,
  Query
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @Get('total-all')
  async getNotification() {
    return await this.dashboardService.notification();
  }

  @Get()
  @Render('admin/partials/dashboard/index')
  async findAll(@Query() query: any) {
    const total = await this.dashboardService.total(
      query['timezone'],
      query['from'],
      query['to']
    );
    return { title: 'Thống kê', pageName: 'Thống kê', total };
  }

  @Get('/tieuchi-sanpham')
  @Render('admin/partials/dashboard/tieuChiSanPham')
  async getReport() {
    const total = await this.dashboardService.tieuChiSanPham();
    return { title: 'Thống kê', pageName: 'Thống kê', total };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDashboardDto: UpdateDashboardDto
  ) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
}
