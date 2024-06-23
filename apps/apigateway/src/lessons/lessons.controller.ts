import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions'

import { CheckMySchoolGuard } from '../guards/check-school.guard'

import { AuthGuard } from '../guards/auth.guard'
import { OnlyModeratorGuard } from '../guards/only-moderator.guard'

import { LessonsService } from './lessons.service'

import { CreateLessonDto } from './dto/create-lesson.dto'
import { DeleteLessonDto } from './dto/delete-lesson.dto'
import { GetAllLessonsDto } from './dto/get-all-lessons.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'
import { ResponseAllLessonsDto } from './res-dto/res-all-lessons.dto'
import { ResponseOneLessonDto } from './res-dto/res-one-lesson.dto'

@ApiTags('Lessons')
@ApiCookieAuth()
@UseGuards(AuthGuard)
@UseGuards(OnlyModeratorGuard)
@UseInterceptors(GrpcToHttpInterceptor)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiCreatedResponse({ description: 'Created lesson', type: ResponseOneLessonDto })
  @UseGuards(new CheckMySchoolGuard({ inBody: true }))
  @Post()
  create(@Body() dto: CreateLessonDto) {
    return this.lessonsService.create(dto)
  }

  @ApiOkResponse({ description: 'Get all lessons by filters', type: ResponseAllLessonsDto })
  @UseGuards(new CheckMySchoolGuard({ inQuery: true }))
  @Get()
  findAll(@Query() dto: GetAllLessonsDto) {
    return this.lessonsService.findAll(dto)
  }

  @ApiOkResponse({ description: 'Get lesson by id', type: ResponseOneLessonDto })
  @UseGuards(new CheckMySchoolGuard({ inQuery: true }))
  @Get(':id')
  findOne(@Param('id') id: string, @Query('schoolId') schoolId: string) {
    return this.lessonsService.findOne(+id, +schoolId)
  }

  @ApiCreatedResponse({ description: 'Updated lesson', type: ResponseOneLessonDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
    return this.lessonsService.update(+id, dto)
  }

  @ApiOkResponse({ description: 'Delete lesson by id', type: ResponseOneLessonDto })
  @UseGuards(new CheckMySchoolGuard({ inBody: true }))
  @Delete(':id')
  remove(@Body() dto: DeleteLessonDto) {
    return this.lessonsService.remove(dto)
  }
}
