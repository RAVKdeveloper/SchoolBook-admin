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

import { ClassController } from './class.controller'
import { ClassService } from './class.service'

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
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
