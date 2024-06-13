import { join } from 'path'

import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { Packages } from '@app/common'

import { SchoolEventsModule } from './school-events.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SchoolEventsModule, {
    transport: Transport.GRPC,
    options: {
      package: Packages.SCHOOL_EVENTS,
      protoPath: join(__dirname, '../school-events.proto'),
      url: process.env.SCHOOL_EVENTS_URL,
    },
  })

  await app.listen()
}
bootstrap()
