import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DatabaseModule, OwnerEntity, School, UserEntity } from '@app/common'

import { S3Api } from './common/s3.service'

import { FilesController } from './files.controller'
import { FilesService } from './files.service'

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([UserEntity, School, OwnerEntity])],
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
