import { Module } from '@nestjs/common';
import { TopQuestionsController } from './top-questions.controller';
import { TopQuestionsService } from './top-questions.service';

@Module({
  imports: [],
  controllers: [TopQuestionsController],
  providers: [TopQuestionsService],
})
export class TopQuestionsModule {}
