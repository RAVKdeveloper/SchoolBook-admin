import { ForbiddenException, Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

import { TOP_QUESTIONS_SERVICE_NAME, TopQuestionsServiceClient } from '@app/common'

import { CreateTopQuestionDto } from './dto/create-top-question.dto'
import { GetPopularQuestionsDto } from './dto/get-popular-questions.dto'

@Injectable()
export class TopQuestionsService implements OnModuleInit {
  private topQuestionsService: TopQuestionsServiceClient

  constructor(@Inject(TOP_QUESTIONS_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.topQuestionsService = this.client.getService<TopQuestionsServiceClient>(
      TOP_QUESTIONS_SERVICE_NAME,
    )
  }

  create(dto: CreateTopQuestionDto, userId: number) {
    return this.topQuestionsService.createQuestion({ ...dto, creatorId: userId })
  }

  getPopularQuestions(dto: GetPopularQuestionsDto) {
    const schoolId = Number(dto.schoolId)

    if (isNaN(schoolId)) throw new ForbiddenException('Невалидный id')

    return this.topQuestionsService.getPopularQuestions({ ...dto, schoolId })
  }

  getQuestionById(id: number) {
    return this.topQuestionsService.getQuestionById({ id })
  }
}
