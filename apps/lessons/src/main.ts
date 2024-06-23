import { join } from 'path'

import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { Packages } from '@app/common'

import { LessonsModule } from './lessons.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(LessonsModule, {
    transport: Transport.GRPC,
    options: {
      package: Packages.LESSON,
      protoPath: join(__dirname, '../lesson.proto'),
      url: process.env.LESSON_URL,
    },
  })

  await app.listen()
}
bootstrap()
