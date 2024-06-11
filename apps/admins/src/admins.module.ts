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
  TokensModule,
  UserEntity,
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
    ]),
    DatabaseModule,
    TokensModule,
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
