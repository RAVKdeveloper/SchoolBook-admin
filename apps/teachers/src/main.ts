import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

import { Packages } from '@app/common'

import { TeachersModule } from './teachers.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TeachersModule, {
    transport: Transport.GRPC,
    options: {
      package: Packages.TEACHERS,
      protoPath: join(__dirname, '../teachers.proto'),
      url: process.env.TEACHERS_URL,
    },
  })

  await app.listen()
}
bootstrap()
