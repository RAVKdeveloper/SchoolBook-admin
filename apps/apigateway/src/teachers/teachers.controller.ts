import { Controller, Get, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger'
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions'

import { AuthGuard } from '../guards/auth.guard'
import { OnlyModeratorGuard } from '../guards/only-moderator.guard'

import { TeachersService } from './teachers.service'

import { QueryAllTeachersDto } from './dto/query-teachers.dto'

@ApiTags('Teachers')
@ApiCookieAuth()
@UseInterceptors(GrpcToHttpInterceptor)
@UseGuards(AuthGuard)
@UseGuards(OnlyModeratorGuard)
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get('/all')
  findAllTeachers(@Query() dto: QueryAllTeachersDto) {
    return this.teachersService.getAllTeachers(dto)
  }

  @Get(':id')
  findTeacherById(@Param('id') id: string) {
    return this.teachersService.getTeacherById(+id)
  }
}
