import { Controller, Get } from '@nestjs/common';
import { TopQuestionsService } from './top-questions.service';

@Controller()
export class TopQuestionsController {
  constructor(private readonly topQuestionsService: TopQuestionsService) {}

  @Get()
  getHello(): string {
    return this.topQuestionsService.getHello();
  }
}
