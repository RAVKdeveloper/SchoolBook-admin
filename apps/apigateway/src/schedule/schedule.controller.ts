import { CacheInterceptor } from '@nestjs/cache-manager'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions'

import { AuthGuard } from '../guards/auth.guard'
import { CheckMySchoolGuard } from '../guards/check-school.guard'
import { OnlyModeratorGuard } from '../guards/only-moderator.guard'

import { ScheduleService } from './schedule.service'

import { CreateDayScheduleDto } from './dto/create-day-schedule.dto'
import { CreateWeekScheduleDto } from './dto/create-week-schedule.dto'
import { DeleteScheduleDto } from './dto/delete-schedule.dto'
import { GetDayScheduleDto } from './dto/get-day-schedule.dto'
import { GetWeekScheduleDto } from './dto/get-week-schedule.dto'
import { RecoverScheduleDto } from './dto/recover-schedule.dto'
import { UpdateDayScheduleDto } from './dto/update-schedule.dto'
import { ResponseDayScheduleDto } from './res-dto/res-day-schedule.dto'
import { ResponseWeekScheduleDto } from './res-dto/res-week-schedule.dto'

@ApiTags('Schedule')
@ApiCookieAuth()
@UseInterceptors(GrpcToHttpInterceptor)
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@UseGuards(OnlyModeratorGuard)
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(new CheckMySchoolGuard({ inBody: true }))
  @ApiCreatedResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Ok',
        },
      },
    },
  })
  @Post('/week')
  createWeekSchedule(@Body() dto: CreateWeekScheduleDto) {
    return this.scheduleService.createWeekSchedule(dto)
  }

  @UseGuards(new CheckMySchoolGuard({ inBody: true }))
  @ApiCreatedResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Ok',
        },
      },
    },
  })
  @Post('/day')
  createDaySchedule(@Body() dto: CreateDayScheduleDto) {
    return this.scheduleService.createDaySchedule(dto)
  }

  @ApiOkResponse({ description: 'Get week schedule', type: ResponseWeekScheduleDto })
  @UseGuards(new CheckMySchoolGuard({ inQuery: true }))
  @Get('/week')
  findWeekSchedule(@Query() dto: GetWeekScheduleDto) {
    return this.scheduleService.getWeekSchedule(dto)
  }

  @ApiOkResponse({ description: 'Get day schedule', type: ResponseDayScheduleDto })
  @UseGuards(new CheckMySchoolGuard({ inQuery: true }))
  @Get('/day')
  findDaySchedule(@Query() dto: GetDayScheduleDto) {
    return this.scheduleService.getDaySchedule(dto)
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Ok',
        },
      },
    },
  })
  @UseGuards(new CheckMySchoolGuard({ inBody: true }))
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDayScheduleDto) {
    return this.scheduleService.updateDaySchedule(dto)
  }

  @UseGuards(new CheckMySchoolGuard({ inBody: true }))
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Ok',
        },
      },
    },
  })
  @Put('/recover')
  recoverSchedule(@Body() dto: RecoverScheduleDto) {
    return this.scheduleService.recoverSchedule(dto)
  }

  @UseGuards(new CheckMySchoolGuard({ inBody: true }))
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Ok',
        },
      },
    },
  })
  @Delete('/soft')
  softDelete(@Body() dto: DeleteScheduleDto) {
    return this.scheduleService.softDelete(dto)
  }

  @UseGuards(new CheckMySchoolGuard({ inBody: true }))
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Ok',
        },
      },
    },
  })
  @Delete('/hard')
  hardDelete(@Body() dto: DeleteScheduleDto) {
    return this.scheduleService.hardDelete(dto)
  }
}
