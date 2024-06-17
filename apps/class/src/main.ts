import { join } from 'path'

import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { Packages } from '@app/common'

import { ClassModule } from './class.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ClassModule, {
    transport: Transport.GRPC,
    options: {
      package: Packages.CLASS,
      protoPath: join(__dirname, '../class.proto'),
      url: process.env.CLASS_URL,
    },
  })

  await app.listen()
}
bootstrap()
