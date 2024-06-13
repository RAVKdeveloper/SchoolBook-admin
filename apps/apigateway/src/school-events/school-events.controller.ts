import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import type { Request } from 'express'
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions'

import { CustomHeaders } from '@app/common'

import { AuthGuard } from '../guards/auth.guard'
import { OnlyModeratorGuard } from '../guards/only-moderator.guard'

import { SchoolEventsService } from './school-events.service'

import { CreateSchoolEventDto } from './dto/create-school-events.dto'
import { GetAllEventsDto } from './dto/get-all-events.dto'
import { UpdateSchoolEventDto } from './dto/update-event.dto'
import { ReturnAlSchoolEventsDto } from './return-dto/return-all-events.dto'
import { ResponseOneSchoolEventsDto } from './return-dto/return-one-events.dto'

@ApiTags('School-events')
@ApiCookieAuth()
@UseInterceptors(GrpcToHttpInterceptor)
@UseGuards(AuthGuard)
@Controller('school-events')
export class SchoolEventsController {
  constructor(private readonly schoolEventsService: SchoolEventsService) {}

  @ApiCreatedResponse({ description: 'Return created event', type: ResponseOneSchoolEventsDto })
  @UseGuards(OnlyModeratorGuard)
  @Post()
  create(@Body() dto: CreateSchoolEventDto, @Req() req: Request) {
    const userId = req[CustomHeaders.USER].userId
    return this.schoolEventsService.createSchoolEvent(dto, userId)
  }

  @ApiOkResponse({ description: 'Get all school events', type: ReturnAlSchoolEventsDto })
  @Post('/get-all')
  findAllEvents(@Body() dto: GetAllEventsDto) {
    return this.schoolEventsService.getAllEvents(dto)
  }

  @ApiOkResponse({ description: 'Return event by id', type: ResponseOneSchoolEventsDto })
  @Get(':id')
  findEventById(@Param('id') id: string) {
    return this.schoolEventsService.getSchoolEventById(+id)
  }

  @ApiCreatedResponse({ description: 'Updated school event', type: ResponseOneSchoolEventsDto })
  @Patch(':id')
  updateEvent(@Body() dto: UpdateSchoolEventDto, @Req() req: Request, @Param('id') id: string) {
    const obj = { eventId: +id, creatorId: req[CustomHeaders.USER].userId }
    return this.schoolEventsService.updateSchoolEvent({ ...dto, ...obj })
  }

  @ApiCreatedResponse({ description: 'Deleted school event', type: ResponseOneSchoolEventsDto })
  @Delete(':id')
  deleteSchoolEvent(@Param('id') id: string, @Req() req: Request) {
    const userId = req[CustomHeaders.USER].userId
    return this.schoolEventsService.deleteSchoolEvent(+id, userId)
  }
}
