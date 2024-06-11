import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import {
  ClassEntity,
  DatabaseModule,
  InviteStudentEntity,
  InviteTeacherEntity,
  LessonEntity,
  ModeratorEntity,
  OwnerEntity,
  PointEntity,
  School,
  StudentEntity,
  TeacherEntity,
  UserEntity,
} from '@app/common'

import { InvitesController } from './invites.controller'
import { InvitesService } from './invites.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ModeratorEntity,
      UserEntity,
      School,
      OwnerEntity,
      InviteStudentEntity,
      InviteTeacherEntity,
      StudentEntity,
      TeacherEntity,
      LessonEntity,
      ClassEntity,
      PointEntity,
    ]),
    DatabaseModule,
  ],
  controllers: [InvitesController],
  providers: [InvitesService],
})
export class InvitesModule {}
