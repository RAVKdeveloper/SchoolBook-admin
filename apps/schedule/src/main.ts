import { join } from 'path'

import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { Packages } from '@shared'

import { ScheduleModule } from './schedule.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ScheduleModule, {
    transport: Transport.GRPC,
    options: {
      package: Packages.SCHEDULE,
      protoPath: [join(__dirname, '../schedule.proto')],
      url: process.env.SCHEDULE_URL,
    },
  })

  await app.listen()
}
bootstrap()
