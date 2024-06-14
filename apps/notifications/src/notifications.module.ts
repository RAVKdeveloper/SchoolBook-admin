import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import {
  ClassEntity,
  DatabaseModule,
  EmitterModule,
  LessonEntity,
  ModeratorEntity,
  OwnerEntity,
  PointEntity,
  PointNotificationEntity,
  School,
  StudentEntity,
  TeacherEntity,
  UserEntity,
} from '@app/common'

import { NotificationsController } from './notifications.controller'
import { NotificationsService } from './notifications.service'

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      PointNotificationEntity,
      UserEntity,
      PointEntity,
      StudentEntity,
      LessonEntity,
      School,
      OwnerEntity,
      ModeratorEntity,
      ClassEntity,
      TeacherEntity,
    ]),
    EmitterModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
