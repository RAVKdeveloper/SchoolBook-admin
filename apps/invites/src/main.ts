import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

import { Packages } from '@app/common'

import { InvitesModule } from './invites.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(InvitesModule, {
    transport: Transport.GRPC,
    options: {
      package: Packages.INVITES,
      protoPath: [join(__dirname, '../invites.proto'), join(__dirname, '../proto/admin.proto')],
      url: process.env.INVITES_URL,
    },
  })
  await app.listen()
}
bootstrap()
