import { join } from 'path'

import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { Packages } from '@app/common'

import { SchoolStatisticModule } from './school-statistic.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SchoolStatisticModule, {
    transport: Transport.GRPC,
    options: {
      package: Packages.SCHOOL_STATISTIC,
      protoPath: join(__dirname, '../school-statistic.proto'),
      url: process.env.SCHOOL_STATISTIC_URL,
    },
  })
  await app.listen()
}
bootstrap()
