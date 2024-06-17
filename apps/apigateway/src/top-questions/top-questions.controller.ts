import { CacheInterceptor } from '@nestjs/cache-manager'
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import type { Request } from 'express'
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions'

import { CustomHeaders } from '@app/common'

import { AuthGuard } from '../guards/auth.guard'

import { CreateTopQuestionDto } from './dto/create-top-question.dto'
import { GetPopularQuestionsDto } from './dto/get-popular-questions.dto'
import { ResponseGetAllQuestionsDto } from './response-dto/res-get-all-questions.dto'
import { ResponseGetOneQuestionDto } from './response-dto/res-get-one-question.dto'

import { TopQuestionsService } from './top-questions.service'

@ApiTags('Questions')
@ApiCookieAuth()
@UseInterceptors(CacheInterceptor)
@UseInterceptors(GrpcToHttpInterceptor)
@UseGuards(AuthGuard)
@Controller('top-questions')
export class TopQuestionsController {
  constructor(private readonly topQuestionsService: TopQuestionsService) {}

  @ApiCreatedResponse({ description: 'Create question', type: ResponseGetOneQuestionDto })
  @Post()
  create(@Body() dto: CreateTopQuestionDto, @Req() req: Request) {
    const userId: number = req[CustomHeaders.USER].userId
    return this.topQuestionsService.create(dto, userId)
  }

  @ApiOkResponse({ description: 'Get all questions', type: ResponseGetAllQuestionsDto })
  @Get('/top')
  findPopularQuestions(@Query() dto: GetPopularQuestionsDto) {
    return this.topQuestionsService.getPopularQuestions(dto)
  }

  @ApiOkResponse({ description: 'Get one question by id', type: ResponseGetOneQuestionDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topQuestionsService.getQuestionById(+id)
  }
}
