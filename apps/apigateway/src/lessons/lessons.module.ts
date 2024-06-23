import { join } from 'path'

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { LESSONS_SERVICE_NAME, Packages } from '@app/common'

import { LessonsController } from './lessons.controller'
import { LessonsService } from './lessons.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: LESSONS_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: Packages.LESSON,
          protoPath: join(__dirname, '../lesson.proto'),
          url: process.env.LESSON_URL,
        },
      },
    ]),
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
