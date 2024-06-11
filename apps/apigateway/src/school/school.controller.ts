import { CacheInterceptor } from '@nestjs/cache-manager'
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import type { Request } from 'express'
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions'

import { CustomHeaders } from '@app/common'

import { AuthGuard } from '../guards/auth.guard'
import { IpGuard } from '../guards/ip.guard'
import { OnlyModeratorGuard } from '../guards/only-moderator.guard'
import { OnlyOwnerGuard } from '../guards/only-owner.guard'

import { SchoolService } from './school.service'

import { CreateSchoolDto } from './dto/create-school.dto'
import { UpdateSchoolDto } from './dto/update-school.dto'
import { ResponseOneSchoolDto } from './response-dto/res-school.dto'

@ApiTags('School')
@ApiCookieAuth()
@UseInterceptors(GrpcToHttpInterceptor)
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @UseGuards(OnlyModeratorGuard)
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Ok',
        },
        schoolId: {
          type: 'number',
          example: 1,
        },
      },
    },
  })
  @UseGuards(IpGuard)
  @Post()
  create(@Body() dto: CreateSchoolDto, @Req() req: Request) {
    return this.schoolService.create(dto, req[CustomHeaders.IP], req[CustomHeaders.USER].userId)
  }

  @UseGuards(OnlyModeratorGuard)
  @ApiOkResponse({ type: ResponseOneSchoolDto, description: 'Return one school' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolService.findOne(+id)
  }

  @UseGuards(OnlyOwnerGuard)
  @ApiOkResponse({ type: ResponseOneSchoolDto, description: 'Return update school' })
  @Patch()
  update(@Body() dto: UpdateSchoolDto, @Req() req: Request) {
    const ownerId = req[CustomHeaders.ROLE].ownerId
    return this.schoolService.update(dto, ownerId)
  }
}
