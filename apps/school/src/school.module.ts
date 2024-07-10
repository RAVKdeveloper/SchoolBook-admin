import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import {
  ClassEntity,
  DatabaseModule,
  DayScheduleEntity,
  LessonEntity,
  ModeratorEntity,
  OwnerEntity,
  PointEntity,
  School,
  StudentEntity,
  TeacherEntity,
  UserEntity,
  WeekScheduleEntity,
} from '@app/common'

import { SchoolController } from './school.controller'
import { SchoolService } from './school.service'

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      School,
      UserEntity,
      ClassEntity,
      LessonEntity,
      TeacherEntity,
      OwnerEntity,
      StudentEntity,
      ModeratorEntity,
      PointEntity,
      WeekScheduleEntity,
      DayScheduleEntity,
    ]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
