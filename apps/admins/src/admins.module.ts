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
  TokensModule,
  UserEntity,
  WeekScheduleEntity,
} from '@app/common'

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
