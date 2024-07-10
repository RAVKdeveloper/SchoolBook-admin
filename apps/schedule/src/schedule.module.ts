import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DatabaseModule } from '@app/common'

import {
  ClassEntity,
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
} from '@entities/src'

import { AppUtils } from '@shared'

import { ScheduleController } from './schedule.controller'
import { ScheduleService } from './schedule.service'

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      ClassEntity,
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
    ]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, AppUtils],
})
export class ScheduleModule {}
