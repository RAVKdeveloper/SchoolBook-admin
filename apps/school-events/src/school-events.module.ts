import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import {
  ClassEntity,
  DatabaseModule,
  LessonEntity,
  ModeratorEntity,
  OwnerEntity,
  PointEntity,
  School,
  SchoolEventEntity,
  StudentEntity,
  TeacherEntity,
  UserEntity,
} from '@app/common'

import { SchoolEventsController } from './school-events.controller'
import { SchoolEventsService } from './school-events.service'

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      SchoolEventEntity,
      UserEntity,
      TeacherEntity,
      ClassEntity,
      StudentEntity,
      School,
      LessonEntity,
      OwnerEntity,
      ModeratorEntity,
      PointEntity,
    ]),
  ],
  controllers: [SchoolEventsController],
  providers: [SchoolEventsService],
})
export class SchoolEventsModule {}
