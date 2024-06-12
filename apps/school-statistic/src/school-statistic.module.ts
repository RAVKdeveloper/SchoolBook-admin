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
  StudentEntity,
  TeacherEntity,
  UserEntity,
} from '@app/common'

import { SchoolStatisticController } from './school-statistic.controller'
import { SchoolStatisticService } from './school-statistic.service'

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      PointEntity,
      StudentEntity,
      LessonEntity,
      School,
      OwnerEntity,
      ModeratorEntity,
      UserEntity,
      TeacherEntity,
      ClassEntity,
    ]),
  ],
  controllers: [SchoolStatisticController],
  providers: [SchoolStatisticService],
})
export class SchoolStatisticModule {}
