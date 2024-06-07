import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

import { Packages } from '@app/common'

import { FilesModule } from './files.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(FilesModule, {
    transport: Transport.GRPC,
    options: {
      package: Packages.FILES,
      protoPath: join(__dirname, '../files.proto'),
      url: process.env.FILES_URL,
    },
  })
  await app.listen()
}
bootstrap()
