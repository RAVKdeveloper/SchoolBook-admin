import { join } from 'path'

import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { Packages } from '@app/common'

import { NotificationsModule } from './notifications.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationsModule, {
    transport: Transport.GRPC,
    options: {
      package: Packages.NOTIFICATIONS,
      protoPath: join(__dirname, '../notifications.proto'),
      url: process.env.NOTIFICATIONS_URL,
    },
  })

  await app.listen()
}
bootstrap()
