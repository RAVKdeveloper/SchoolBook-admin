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

import { LessonsController } from './lessons.controller'
import { LessonsService } from './lessons.service'

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
    ]),
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
