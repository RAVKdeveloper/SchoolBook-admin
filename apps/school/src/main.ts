import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

import { Packages } from '@app/common'

import { SchoolModule } from './school.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SchoolModule, {
    transport: Transport.GRPC,
    options: {
      package: Packages.SCHOOL,
      protoPath: [join(__dirname, '../school.proto')],
      url: process.env.SCHOOL_URL,
    },
  })

  await app.listen()
}
bootstrap()
