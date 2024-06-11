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

import { TeachersController } from './teachers.controller'
import { TeachersService } from './teachers.service'

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
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
