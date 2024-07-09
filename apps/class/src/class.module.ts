import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import {
  ClassEntity,
  DatabaseModule,
  DayScheduleEntity,
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
  WeekScheduleEntity,
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
      WeekScheduleEntity,
      DayScheduleEntity,
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
