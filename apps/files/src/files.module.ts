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

import { S3Api } from './common/s3.service'

import { FilesController } from './files.controller'
import { FilesService } from './files.service'

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      UserEntity,
      School,
      OwnerEntity,
      StudentEntity,
      TeacherEntity,
      LessonEntity,
      ClassEntity,
      PointEntity,
      ModeratorEntity,
    ]),
  ],
  controllers: [FilesController],
  providers: [
    FilesService,
    {
      provide: 'S3',
      useClass: S3Api,
    },
  ],
})
export class FilesModule {}
