import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import {
  ClassEntity,
  DatabaseModule,
  LessonEntity,
  LikeEntity,
  ModeratorEntity,
  OwnerEntity,
  PointEntity,
  QuestionsEntity,
  School,
  StudentEntity,
  TeacherEntity,
  TopQuestionCommentEntity,
  UserEntity,
} from '@app/common'

import { TopQuestionsController } from './top-questions.controller'
import { TopQuestionsService } from './top-questions.service'

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      ClassEntity,
      LessonEntity,
      ModeratorEntity,
      OwnerEntity,
      PointEntity,
      School,
      StudentEntity,
      TeacherEntity,
      UserEntity,
      QuestionsEntity,
      LikeEntity,
      TopQuestionCommentEntity,
    ]),
  ],
  controllers: [TopQuestionsController],
  providers: [TopQuestionsService],
})
export class TopQuestionsModule {}
