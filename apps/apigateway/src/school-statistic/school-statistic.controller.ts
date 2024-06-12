import { CacheInterceptor } from '@nestjs/cache-manager'
import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger'
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions'

import { AuthGuard } from '../guards/auth.guard'
import { OnlyModeratorGuard } from '../guards/only-moderator.guard'

import { SchoolStatisticService } from './school-statistic.service'

import { QueryAveragePointDto } from './dto/query-average-point.dto'

@ApiTags('School-statistic')
@ApiCookieAuth()
@UseInterceptors(GrpcToHttpInterceptor)
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@UseGuards(OnlyModeratorGuard)
@Controller('school-statistic')
export class SchoolStatisticController {
  constructor(private readonly schoolStatisticService: SchoolStatisticService) {}

  @Get('/average-point')
  findAveragePoint(@Query() dto: QueryAveragePointDto) {
    return this.schoolStatisticService.getAveragePoint(dto)
  }
}
