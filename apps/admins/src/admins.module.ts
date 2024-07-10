import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DatabaseModule, TokensModule } from '@app/common'

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

import { AdminsController } from './admins.controller'
import { AdminsService } from './admins.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OwnerEntity,
      ModeratorEntity,
      UserEntity,
      School,
      StudentEntity,
      TeacherEntity,
      LessonEntity,
      ClassEntity,
      PointEntity,
      DayScheduleEntity,
      WeekScheduleEntity,
    ]),
    DatabaseModule,
    TokensModule,
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
