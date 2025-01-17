import {
  Controller,
  Post,
  Patch,
  Get,
  Query,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGaurd } from '../gaurds/auth.gaurd';
import { AdminGaurd } from '../gaurds/admin.gaurd';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportApprovalDto } from './dtos/report.approval.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  getEstimates(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimates(query);
    // console.log(query);
  }

  @Post()
  @UseGuards(AuthGaurd)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  // @Serialize(ReportApprovalDto)
  @UseGuards(AdminGaurd)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
