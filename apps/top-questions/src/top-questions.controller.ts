import { Controller } from '@nestjs/common'

import {
  CreateQuestionsDto,
  GetPopularQuestionsDto,
  GetQuestionByIdDto,
  ReturnOneQuestionDto,
  ReturnPopularQuestionsDto,
  TopQuestionsServiceController,
  TopQuestionsServiceControllerMethods,
} from '@app/common'

import { Observable } from 'rxjs'
import { TopQuestionsService } from './top-questions.service'

@Controller()
@TopQuestionsServiceControllerMethods()
export class TopQuestionsController implements TopQuestionsServiceController {
  constructor(private readonly topQuestionsService: TopQuestionsService) {}

  createQuestion(
    dto: CreateQuestionsDto,
  ): ReturnOneQuestionDto | Promise<ReturnOneQuestionDto> | Observable<ReturnOneQuestionDto> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.topQuestionsService.createQuestion(dto)
  }

  getPopularQuestions(
    dto: GetPopularQuestionsDto,
  ): Promise<ReturnPopularQuestionsDto> | Observable<ReturnPopularQuestionsDto> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.topQuestionsService.getPopularQuestions(dto)
  }

  getQuestionById(
    dto: GetQuestionByIdDto,
  ): ReturnOneQuestionDto | Promise<ReturnOneQuestionDto> | Observable<ReturnOneQuestionDto> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.topQuestionsService.getQuestionById(dto)
  }
}
