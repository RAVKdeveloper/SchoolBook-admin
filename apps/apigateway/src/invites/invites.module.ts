import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'

import { INVITES_SERVICE_NAME, Packages } from '@app/common'

import { InvitesController } from './invites.controller'
import { InvitesService } from './invites.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: INVITES_SERVICE_NAME,
        options: {
          package: Packages.INVITES,
          protoPath: [join(__dirname, '../invites.proto')],
          url: process.env.INVITES_URL,
        },
      },
    ]),
  ],
  controllers: [InvitesController],
  providers: [InvitesService],
})
export class InvitesModule {}
