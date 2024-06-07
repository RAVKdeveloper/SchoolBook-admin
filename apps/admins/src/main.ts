import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

import { Packages } from '@app/common'

import { AdminsModule } from './admins.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AdminsModule, {
    transport: Transport.GRPC,
    options: {
      package: Packages.ADMINS,
      protoPath: join(__dirname, '../admin.proto'),
      url: process.env.ADMINS_URL,
    },
  })
  await app.listen()
}
bootstrap()
